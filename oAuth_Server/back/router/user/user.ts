import express, { Request, Response } from 'express';
import crypto from 'crypto';
import deployed from '../../web3';
import VerifyId from '../../models/user/verifyId.model';

const router = express.Router();

router.post('/oAuthRegister', async (req: Request, res: Response) => {
    const { email, password, gender, name, age, addr, mobile } = req.body;

    try {
        const userHash = email + password;
        const hash = crypto.createHash('sha256').update(userHash).digest('base64');
        const DATA = {
            email,
            gender,
            name,
            age,
            addr,
            mobile,
        };

        const contract = await deployed();
        await contract.methods.registerUser(hash, DATA).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
        });

        const result = await contract.methods.isRegistered(hash).call();

        const restAPI = '1';

        if (result) {
            await VerifyId.create({
                hashId: hash,
                email,
                restAPI,
            });
            res.json({
                status: true,
                msg: '회원 가입이 완료되었습니다.',
            });
        }
    } catch (e) {
        if (e instanceof Error) console.log(e.message);

        res.json({
            status: false,
            msg: '회원 가입에 실패했습니다.',
        });
    }
});

router.post('/upDatePassword', async (req: Request, res: Response) => {
    const { hashId, email, newPassword } = req.body;

    try {
        const newpasswordId = email + newPassword;
        const newHash = crypto.createHash('sha256').update(newpasswordId).digest('base64');

        const contract = await deployed();
        await contract.methods.updatePassword(hashId, newHash).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
        });

        await VerifyId.update(
            {
                hashId: newHash,
            },
            {
                where: {
                    hashId: hashId,
                },
            },
        );
        res.json({
            status: true,
            msg: '비밀번호 변경이 완료되었습니다.',
        });
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json({
            status: true,
            msg: '비밀번호 변경이 완료되었습니다.',
        });
    }
});

router.post('/upDateUser', async (req: Request, res: Response) => {
    const { gender, name, age, addr, mobile, email, hashId } = req.body;

    try {
        const DATA = {
            gender,
            name,
            age,
            addr,
            mobile,
            email,
        };

        const contract = await deployed();
        const checkUser = await contract.methods.isRegistered(hashId).call();

        if (checkUser) {
            await contract.methods.updateUser(hashId, DATA).send({
                from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
                gas: 10000000,
            });

            const result = await contract.methods.getUser(hashId).call();

            console.log(result);

            res.json({
                status: true,
                name: result[1],
                age: result[2],
                gender: result[0],
                addr: result[3],
                mobile: result[4],
                msg: '회원정보가 변경되었습니다.',
            });
        }
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json({
            status: false,
            msg: '회원정보를 변경하지 못하였습니다.',
        });
    }
});

router.post('/searchUser', async (req: Request, res: Response) => {
    const { hashId } = req.body;

    try {
        const contract = await deployed();

        const result = await contract.methods.getUser(hashId).call();

        res.json({
            status: true,
            name: result[1],
            age: result[2],
            gender: result[0],
            addr: result[3],
            mobile: result[4],
        });
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json({
            status: false,
            msg: '유저 정보를 불러오는데 실패하였습니다.',
        });
    }
});

router.post('/deleteUser', async (req: Request, res: Response) => {
    const { hashId } = req.body;

    try {
        await VerifyId.destroy({ where: { hashId: hashId } });

        const contract = await deployed();

        await contract.methods.deleteUser(hashId).send({
            from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4',
            gas: 10000000,
        });

        const checkUser = await contract.methods.isRegistered(hashId).call();

        if (checkUser) throw new Error('회원 탈퇴 처리 실패');

        res.json({
            status: true,
            msg: '회원탈퇴가 완료되었습니다.',
        });
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
        res.json({
            status: false,
            msg: '회원탈퇴를 실패하였습니다.',
        });
    }
});

export default router;
