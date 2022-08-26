const Migrations = artifacts.require("DID.sol");

const _data = {
	gender: "Female",
	name: "ivy",
	age: 10,
	address: "서울시 광진구",
	mobile: "010-1111-1111",
	email: "yellow_w@naver.com",
	password: "1234",
};
module.exports = function (deployer) {
	deployer.deploy(Migrations);
};
