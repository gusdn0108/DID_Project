declare const loginService: {
    authorize: (data: any) => Promise<any>;
    codeAuthorize: (MAKE_ACCESS_TOKEN: any) => Promise<any>;
    codeAuthorize2: (bearer_token: any) => Promise<any>;
    localAuthorize: (email: string, password: string) => Promise<any>;
};
export default loginService;
