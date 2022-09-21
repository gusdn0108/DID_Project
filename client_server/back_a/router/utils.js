const filterNull = (uris) => {
    const newRedirectUri = [];
    for (let i = 0; i < uris.length; i++) {
        if (uris[i] !== null) {
            newRedirectUri.push(uris[i]);
        }
    }

    return newRedirectUri;
};

const oauth_Front = 'http://3.35.86.127';
const oauth_Back = 'http://13.124.225.13';
const frontEnd = 'http://localhost:3000';

module.exports = { filterNull, oauth_Front, oauth_Back, frontEnd };
