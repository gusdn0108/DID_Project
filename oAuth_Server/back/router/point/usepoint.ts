import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import TotalPoint from '../../models/user/totalPoint.model';

const router = express.Router();

/** 최초 결제 모듈 페이지 접속시 해당 유저의 가입된 사이트의 포인트를 전달해줌 */
router.post('/getPoint', (req, res) => {
    console.log('hello');
});

export default router;
