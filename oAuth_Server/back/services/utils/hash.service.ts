import crypto from 'crypto';

const cipher = (data: string | number) => {
    const encrypt = crypto.createCipher('des', process.env.SECRET_KEY); // des알고리즘과 키를 설정
    const encryptResult =
        encrypt.update(data, 'utf8', 'base64') + // 암호화
        encrypt.final('base64'); // 인코딩

    console.log(encryptResult);
    return encryptResult;
};

const decipher = (data: string | number) => {
    if (data === '') return '';
    const decode = crypto.createDecipher('des', process.env.SECRET_KEY);
    const decodeResult =
        decode.update(data, 'base64', 'utf8') + // 암호화된 문자열, 암호화 했던 인코딩 종류, 복호화 할 인코딩 종류 설정
        decode.final('utf8'); // 복호화 결과의 인코딩

    console.log(decodeResult);
    return decodeResult;
};

export { cipher, decipher };
