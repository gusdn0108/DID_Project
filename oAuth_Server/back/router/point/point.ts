import express, {Request,Response} from 'express';
import { Failable, Failure, Point, Result } from '../../@types/response';
import jwt from 'jsonwebtoken';
import sequelize from '../../models';
import TotalPoint from '../../models/user/totalPoint.model';
import App from '../../models/webSite/app.model';
import { QueryTypes } from 'sequelize/types';

const router = express.Router();



router.post('/checkPoint', async (req: Request, res: Response)=>{
    const {email} = req.body
    let response;
    // let response: Failable<Point[],string>
    try{
        const [result] = await sequelize.query(`select * from point_totals where email = :email`,{
            replacements:{email},
            raw: true,
            model: TotalPoint,
        })
        response = {
            isError: false,
            value:result
        }
    } catch (e){
        console.log(e.message)
        response = {
            isError: true,
            error:e.message
        }
    }
    res.json(response)
    // res.json(response)
})

//토큰 생성 후 프론트로 보내기
router.post('/sendToken', async(req: Request, res: Response)=>{
    console.log('1111111')
    const { pointInfo } = req.body;
    console.log(pointInfo)


    // {
    //     "pointInfo": [
    //         {
    //             "hashId":"1111",
    //             "restAPI":"1234",
    //             "point":500
    //         },
    //         {
    //             "hashId":"1111",
    //             "restAPI":"2222",
    //             "point":1000
    //         },
    //         {
    //             "hashId":"1111",
    //             "restAPI":"3333",
    //             "point":200
    //         },
    //     ]
    // }

    // let token
    // if(pointInfo){
    // token = jwt.sign({
    //     pointInfo
    // },
    // process.env.SECRET_KEY as string
    // )
    // console.log(token)
}
    // const response: Failable<string,string> = {
    //     isError: false,
    //     value:token
    // }
    // res.json(token);
)


//검증 및 포인트 사용
router.post('/usePoint', async(req:Request, res: Response)=>{
    const tx = await sequelize.transaction();

    try{

    } catch (e) {

    }
})

export default router;