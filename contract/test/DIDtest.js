const Deploy = artifacts.require("DID.sol");

describe("DID test", async () => {
	it("getUser", async () => {
		const getDeployed = await Deploy.deployed();

		const user = await getDeployed.getUser.call(
			"0x884592D5BE23f2d05e092aE76002108027cc1658"
		);
		// console.log(user);
	});
	it("isRegistered", async () => {
		const getDeployed = await Deploy.deployed();

		const isRegistered = await getDeployed.isRegistered.call(
			"0x884592D5BE23f2d05e092aE76002108027cc1658"
		);
		// console.log(isRegistered);
	});
	it("registerUser", async () => {
		const getDeployed = await Deploy.deployed();

		const _data = {
			gender: "female",
			name: "red",
			age: 10,
			addr: "서울시 광진구",
			mobile: "010-1111-1111",
			email: "red@gmail.com",
		};
		await getDeployed.registerUser("22222", _data);
		const isRegistered = await getDeployed.isRegistered.call("22222");
		const userInfo = await getDeployed.getUser.call("22222");
		console.log(isRegistered, userInfo);
	});

	it("updatePw", async () => {
		const getDeployed = await Deploy.deployed();
		const isRegistered = await getDeployed.isRegistered("22222");
		const block = await getDeployed.updatePassword("22222", "111");
		const shouldBeNull = await getDeployed.getUser.call("22222");
		const afterChanged = await getDeployed.getUser.call("111");
		console.log(isRegistered, block, shouldBeNull, afterChanged);
	});
});
