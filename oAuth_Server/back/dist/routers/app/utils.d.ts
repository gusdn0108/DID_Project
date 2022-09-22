export declare const makeRedirectUriList: (length: any) => any[];
export declare const generateHash: (appName: string, email: string) => string[];
export declare const responseObject: (status: boolean, msg: string) => {
    status: boolean;
    msg: string;
};
export declare const infoStringToBool: (getUserInfo: any) => number[];
export declare const boolToNum: (infoArray: any) => any;
export declare const noWhiteSpace: (uri: any) => any;
export declare const filterNull: (uris: any) => any[];
export declare const insertNewUri: (restAPI: string, uris: any) => Promise<void>;
export declare const getUserinfo: (restAPI: string, hash: string) => Promise<{
    att: string;
    value: any;
}[]>;
export declare const refineVP: (rawVP: any) => any[];
export declare const rawVP: (infoReq: any) => {
    att: string;
    value: any;
}[];
export declare const filterNotNeeded: (infos: any) => any;
export declare const makeRawVP: (VP: any) => {
    att: string;
    value: any;
}[];
