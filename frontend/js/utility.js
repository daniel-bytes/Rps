'use strict';

function parseGameIdFromUrl(document) {
    if (document && document.location && document.location.pathname) {
        let parts = document.location.pathname.split('/');

        for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i]) {
                return parts[i];
            }
        }
    }
    
    return "";
}


export function parseGameProps(document) {
    const gameid = parseGameIdFromUrl(document);
    const cookies = parseCookies(document);

    return {
        gameid: gameid || cookies.gameid,
        playerid: cookies.playerid
    }
}

export function parseCookies(document) {
    const results = {};

    if (document && document.cookie) {
        const parts = document.cookie.split(';');

        for (let part of parts) {
            const kv = part.trim().split('=');
            
            results[kv[0].trim()] = kv.length < 2 ? '' : kv[1].trim();
        }
    }

    return results;
}