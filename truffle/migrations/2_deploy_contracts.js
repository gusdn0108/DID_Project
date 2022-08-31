const Migrations = artifacts.require("DID.sol");

module.exports = function (deployer) {
	deployer.deploy(Migrations);
};
