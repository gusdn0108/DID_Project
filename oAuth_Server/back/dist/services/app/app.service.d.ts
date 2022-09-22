import { IResponse_App } from "../../@types/response";
declare const appService: {
    apiDistribution: (appName: string, email: string) => Promise<IResponse_App>;
    getMyApp: (email: string) => Promise<IResponse_App>;
    deleteApp: (restAPI: string, client_secret: string) => Promise<IResponse_App>;
    appInfo: (restAPI: string) => Promise<IResponse_App>;
    getInfoUpdate: (getUserInfo: any, restAPI: string) => Promise<IResponse_App>;
    updateRedirect: (uris: string[], restAPI: string) => Promise<IResponse_App>;
    giveUserInfo: (restAPI: any) => Promise<IResponse_App>;
    userdidregister: (data: any) => Promise<IResponse_App>;
};
export default appService;
