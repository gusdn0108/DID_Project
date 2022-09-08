export const makeRedirectUriList = (length:any) => {
    let tempRedirectUri = new Array(length)
    for( let i = 0; i < tempRedirectUri.length; i++) {
        tempRedirectUri[i] = null
    }

    return tempRedirectUri
}

import crypto from 'crypto'
import RedirectURI from '../../models/webSite/redirectURI.model'

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


export const responseObject = (status:boolean, msg:string) => {
    const response = {
        status: status,
        msg : msg
    }
    return response
}

export const infoStringToBool = (getUserInfo:any) => {
    const getInfoBool = []
    for(let i = 0; i < getUserInfo.length; i++) {
        if(getUserInfo[i].get == true) {
            getInfoBool.push(1)
        }
        else {
            getInfoBool.push(0)
        }
    }
    return getInfoBool;
}

export const noWhiteSpace = (uri : any) => {
    for (let i =0; i < uri.length; i++) {
        if(uri[i] !== null) {
            uri[i] = uri[i].trim()
        }
    }
    return uri;
}

export const filterNull = (uris:any) => {
    const newRedirectUri = []
    for( let i = 0; i < uris.length; i++) {
        if(uris[i] !== null) {
            newRedirectUri.push(uris[i])
        }
    }

    return newRedirectUri;
}

export const insertNewUri = async ( restAPI : string, uris : any ) => {
    for (let i = 0 ; i < uris.length; i ++) {
        const newInsert = await RedirectURI.create({
            restAPI: restAPI,
            redirectURI : uris[i]
        })
    }
}

export const filterNotNeeded = ( infos : any) => {
    for (let i = 0; i < infos.length; i++) {
        if(infos[i].value == false) {
            delete infos[i]
        }
    }
    return infos
}
