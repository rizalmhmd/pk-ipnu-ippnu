/**
 * Sanitize rich HTML content before rendering via dangerouslySetInnerHTML.
 * Removes dangerous tags (script, iframe, object, embed, form, meta, base, etc.),
 * inline event handlers (on*), and unsafe URI schemes (javascript:, vbscript:, data:text/html).
 */
export function sanitizeHtml(html) {
    if (!html || typeof html !== 'string') {
        return '';
    }

    if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const blockedTags = new Set([
            'script', 'style', 'iframe', 'frame', 'frameset',
            'object', 'embed', 'applet', 'form', 'input',
            'button', 'textarea', 'select', 'meta', 'link', 'base',
        ]);

        const elements = Array.from(doc.body.querySelectorAll('*'));
        for (const el of elements) {
            const tagName = el.tagName.toLowerCase();
            if (blockedTags.has(tagName)) {
                el.remove();
                continue;
            }

            const attrs = Array.from(el.attributes);
            for (const attr of attrs) {
                const name = attr.name.toLowerCase();
                const value = attr.value.trim().toLowerCase().replace(/[\u0000-\u001f\s]+/g, '');

                if (name.startsWith('on') || name === 'srcdoc') {
                    el.removeAttribute(attr.name);
                    continue;
                }

                if (['href', 'src', 'xlink:href', 'action', 'formaction'].includes(name)) {
                    if (
                        value.startsWith('javascript:') ||
                        value.startsWith('vbscript:') ||
                        value.startsWith('data:text/html')
                    ) {
                        el.removeAttribute(attr.name);
                    }
                }
            }

            if (tagName === 'a' && el.getAttribute('target') === '_blank') {
                el.setAttribute('rel', 'noopener noreferrer');
            }
        }

        return doc.body.innerHTML;
    }

    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
        .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '')
        .replace(/javascript:/gi, '');
}

