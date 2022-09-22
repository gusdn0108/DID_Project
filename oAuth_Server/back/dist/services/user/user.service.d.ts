declare const userService: {
    oAuthRegister: (data: any) => Promise<any>;
    upDatePassword: (data: any) => Promise<any>;
    upDateUser: (data: any) => Promise<any>;
    searchUser: (hashId: string) => Promise<any>;
    deleteUser: (hashId: string, email: string) => Promise<any>;
};
export default userService;
