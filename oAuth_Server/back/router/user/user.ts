import express,{Request, Response} from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
// const bcrypt = require('bcrypt/bcrypt')
import Web3 from 'web3';
import deployed from '../../web3';
import VerifyId from '../../models/user/verifyId.model';

import addAbortSignal from 'stream';


const router = express.Router();
// const { addAbortSignal } = require('stream');

const web3 = new Web3(new Web3.providers.HttpProvider('https://opt-goerli.g.alchemy.com/v2/GgIVsMFIKf4Pjwp8TmTN8gXftrnZf9A2'));



router.post('/oAuthRegister', async (req: Request, res: Response) => {
    const { email, password, gender, name, age, addr, mobile } = req.body;

    // console.log(email, password, gender, name, age, addr, mobile);
    // 이메일,패스워드,성별,이름,나이,주소,핸드폰번호
    try {
        const userHash = email + password;
        const hash = crypto.createHash('sha256').update(userHash).digest('base64');
        // const passwordHash = await bcrypt.hash(password, 12);
        console.log(hash)
        const DATA = {
            email,
            gender,
            name,
            age,
            addr,
            mobile,
        };

        const deploy = await deployed();
        await deploy.methods.registerUser(hash, DATA).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
        });

        const result = await deploy.methods.getUser(hash).call();
        console.log(result)
        //restAPI 값 넣어야함
        const restAPI = '1';
        if (result) {
            await VerifyId.create({
                hashId: hash,
                email,
                restAPI
            });
            const response = {
                status: true,
                msg: '회원 가입이 완료되었습니다.',
            };
            res.json(response);
        } else {
            const response = {
                status: false,
                msg: '회원 가입에 실패했습니다.',
            };
            res.json(response);
        }
    }catch(e){
        if(e instanceof Error) console.log(e.message);
    }
});

router.post('/upDatePassword', async (req: Request, res: Response) => {
    const { email, newPassword, oldPassword } = req.body;

    try {
        const previousHash = email + oldPassword;
        const newpasswordId = email + newPassword;
        const oldHash = crypto.createHash('sha256').update(previousHash).digest('base64');
        const newHash = crypto.createHash('sha256').update(newpasswordId).digest('base64');
        const deploy = await deployed();

        await deploy.methods.updatePassword(oldHash, newHash).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
        });

        const result = await deploy.methods.getUser(oldHash).call();
        const result2 = await deploy.methods.getUser(newHash).call();

        console.log(result);
        console.log(result2);

        await VerifyId.update({
            hashId: newHash
        },            {
            where : {
                hashId:oldHash
            }
        })
        const response = {
            status: true,
            msg: '비밀번호 변경이 완료되었습니다.',
        };
        res.json(response);

    }catch(e){
        if(e instanceof Error) console.log(e.message);
        const response = {
            status: true,
            msg: '비밀번호 변경이 완료되었습니다.',
        };
        res.json(response);
}});

router.post('/upDateUser', async (req: Request, res: Response) => {
    const { gender, name, age, addr, mobile, email, password } = req.body;

    try {
        const userHash = email + password;
        const hash = crypto.createHash('sha256').update(userHash).digest('base64');
        const DATA = {
            gender,
            name,
            age,
            addr,
            mobile,
            email
        };

        const deploy = await deployed();
        console.log('유저 등록 되어 있음???',await deploy.methods.isRegistered(hash).call())
        await deploy.methods.updateUser(hash, DATA).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
            gas: 10000000,
        });
        const result = await deploy.methods.getUser(hash).call();
        console.log(result);
    }catch(e){
        if(e instanceof Error) console.log(e.message);
    }
});

router.post('/searchUser', async (req: Request, res: Response) => {
    
    const { email, password } = req.body;
    const userHash = email + password;
    const hash = crypto.createHash('sha256').update(userHash).digest('base64');
    const deploy = await deployed();
    console.log('유저 등록 되어 있음???',await deploy.methods.isRegistered(hash).call())
    const result = await deploy.methods.getUser(hash).call();
    console.log(result);
});

router.post('/deleteUser', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // 에러수정

    try {
        const userHash = email + password;
        const hash = crypto.createHash('sha256').update(userHash).digest('base64');
        const deploy = await deployed();
        console.log('유저 등록 되어 있음???',await deploy.methods.isRegistered(hash).call())

        await deploy.methods.deleteUser(hash).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
            gas: 10000000,
        });
        const result = await deploy.methods.getUser(hash).call();
        console.log(result);
    }catch(e){
        if(e instanceof Error) console.log(e.message);
    }
});

export default router;
