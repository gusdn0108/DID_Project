export const makeRedirectUriList = (length:any) => {
    let tempRedirectUri = new Array(length)
    for( let i = 0; i < tempRedirectUri.length; i++) {
        tempRedirectUri[i] = null
    }

    return tempRedirectUri
}

import crypto from 'crypto'

export const generateHash = (appName:string, email:string) => {
    const randomNum = Math.floor(Math.random() * 1000000);
    const forRestAPI = appName + email + randomNum;
    const randomNum2 = Math.floor(Math.random() * 1000000) + 1000000;
    const forSecret = appName + email + randomNum2;

    const REST_API = crypto.createHmac('sha256', forRestAPI).digest('hex').substr(0, 31);
    const client_secret = crypto.createHmac('sha256', forSecret).digest('hex').substr(0, 31);

    const appCodes = [REST_API, client_secret];
    return appCodes;
};


