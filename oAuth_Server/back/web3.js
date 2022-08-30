const Provider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const DID = require('./contracts/DID.json');
require('dotenv').config();

const provider = new Provider(process.env.MNEMONIC, process.env.OPTIMISM_GOERLI_URL);
const web3 = new Web3(provider);

const DATA = {
    email: 'test1234@naver.com',
    password: '123456789',
    uuid: 'test uuid',
    A: true,
};

const deployed = async () => {
    const networkId = await web3.eth.net.getId();
    const abi = DID.abi;
    const CA = DID.networks[networkId].address;

    const deploy = new web3.eth.Contract(abi, CA);

    try {
        await deploy.methods.registerUser('test123', DATA).send({ from: '0x7b6283591c09b1a738a46Acc0BBFbb5943EDb4F4' });
        
        const result = await deploy.methods.getUser('test123').call();
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

deployed();
