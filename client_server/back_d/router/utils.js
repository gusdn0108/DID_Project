const filterNull = (uris) => {
    const newRedirectUri = [];
    for (let i = 0; i < uris.length; i++) {
        if (uris[i] !== null) {
            newRedirectUri.push(uris[i]);
        }
    }

    return newRedirectUri;
};

const oauth_Front = 'localhost:8080';
const oauth_Back = 'localhost:8000';
const frontEnd = 'localhost:3003';

module.exports = { filterNull, oauth_Front, oauth_Back, frontEnd };
