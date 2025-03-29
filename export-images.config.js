const path = require('path');

/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
    convertFormat: [
        ['png', 'webp'],
        ['jpg', 'webp'],
    ],
    remoteImages: async () => {
        const works = await fetchFromNewt("works?select=thumbnail");
        const photos = await fetchFromNewt("photo?select=images");

        return [
            ...photos.items.map((photo) => photo.images.map((image) => image.src)).flat(),
            ...works.items.map((work) => work.thumbnail?.src),
        ]
    }
}

module.exports = config

const NEWT_CDN_API_BASE = 'https://portfolio-okd.cdn.newt.so/v1/portfolio';
const NEWT_API_TOKEN = '8PClGqfTTiAaPWPknZidEuTLcH2r7gntjeYWu6GX7GM';

/**
 * Generic fetch function for Newt API calls
 */
async function fetchFromNewt(endpoint, options = {}) {
    const url = `${NEWT_CDN_API_BASE}/${endpoint}`;
    const defaultOptions = {
        headers: {
            'Authorization': `Bearer ${NEWT_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, {
        ...defaultOptions,
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}