const Migrations = artifacts.require("ABC.sol");

module.exports = function (deployer) {
	deployer.deploy(Migrations);
};
