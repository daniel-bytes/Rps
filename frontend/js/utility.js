'use strict';

export function parseCookies(document) {
    const results = {};

    if (document && document.cookies) {
        const parts = document.cookies.split(';');

        for (let part of parts) {
            const kv = part.trim().split('=');
            
            results[kv[0].trim()] = kv.length < 2 ? '' : kv[1].trim();
        }
    }

    return results;
}