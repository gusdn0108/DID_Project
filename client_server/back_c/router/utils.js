const filterNull = (uris) => {
    const newRedirectUri = [];
    for (let i = 0; i < uris.length; i++) {
        if (uris[i] !== null) {
            newRedirectUri.push(uris[i]);
        }
    }

    return newRedirectUri;
};

module.exports = { filterNull };
