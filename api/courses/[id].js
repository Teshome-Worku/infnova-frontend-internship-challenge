export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const REMOTE = process.env.REMOTE_API_BASE || 'https://infnova-course-api.vercel.app';

    // preserve query string from incoming request
    const search = req.url && req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const q = search || '';
    const qsSuffix = q ? `&${q.slice(1)}` : '';

    // obtain id from req.query (serverless frameworks) or from the URL path
    let id = (req.query && req.query.id) || null;
    if (!id) {
        const m = req.url && req.url.match(/\/api\/courses\/([^/?]+)/);
        if (m) id = decodeURIComponent(m[1]);
    }

    if (!id) {
        return res.status(400).json({ error: 'Missing course id' });
    }

    const candidates = [
        `${REMOTE}/courses/${encodeURIComponent(id)}${q}`,
        `${REMOTE}/api/courses/${encodeURIComponent(id)}${q}`,
        `${REMOTE}/course/${encodeURIComponent(id)}${q}`,
        `${REMOTE}/api/course/${encodeURIComponent(id)}${q}`,
        `${REMOTE}/v1/courses/${encodeURIComponent(id)}${q}`,
        `${REMOTE}/courses?id=${encodeURIComponent(id)}${qsSuffix}`,
        `${REMOTE}/api/courses?id=${encodeURIComponent(id)}${qsSuffix}`,
    ];

    for (const target of candidates) {
        console.log('proxy /api/courses/:id ->', target);
        try {
            const r = await fetch(target, { method: 'GET', headers: { Accept: 'application/json' } });
            const contentType = r.headers.get('content-type') || '';
            const text = await r.text();

            if (!r.ok) {
                console.error('proxy /courses/:id non-ok', target, r.status, text ? text.slice(0, 200) : '');
                continue; // try next candidate
            }

            if (contentType.includes('application/json')) {
                try {
                    const data = JSON.parse(text);
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('x-upstream-target', target);
                    console.log('proxy /courses/:id OK ->', target);
                    return res.status(r.status).json(data);
                } catch (err) {
                    console.error('proxy /courses/:id invalid-json', target, err, text ? text.slice(0, 200) : '');
                    // fallthrough to wrapped JSON
                }
            }

            // Upstream returned non-JSON (likely HTML). Wrap into JSON to avoid client parse errors.
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('x-upstream-target', target);
            return res.status(r.status).json({
                error: 'non-json-response',
                upstream: target,
                status: r.status,
                contentType,
                bodyPreview: text ? text.slice(0, 2000) : null,
            });
        } catch (err) {
            console.error('proxy /courses/:id error', target, err);
            // try next candidate
        }
    }

    return res.status(502).json({ error: 'Bad gateway' });
}