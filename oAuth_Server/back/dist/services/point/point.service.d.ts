import { Failable, Point } from '../../@types/response';
declare const pointService: {
    checkPoint: (email: string) => Promise<Failable<Point[], string>>;
    sendToken: (pointInfo: any) => Promise<Failable<string, string>>;
    usePoint: (token: string, payPoint: any) => Promise<Failable<string, string>>;
    getPoint: (restAPI: any, email: any) => Promise<any>;
};
export default pointService;
