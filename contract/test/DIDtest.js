const Deploy = artifacts.require("DID.sol");

describe("DID test", async () => {
	it("getUser", async () => {
		const getDeployed = await Deploy.deployed();

		const user = await getDeployed.getUser.call(
			"0x884592D5BE23f2d05e092aE76002108027cc1658"
		);
		console.log(user);
	});
	it("isRegistered", async () => {
		const getDeployed = await Deploy.deployed();

		const isRegistered = await getDeployed.isRegistered.call(
			"0x884592D5BE23f2d05e092aE76002108027cc1658"
		);
		console.log(isRegistered);
	});
	it("registerUser", async () => {
		const getDeployed = await Deploy.deployed();

		const user = await getDeployed.registerUser.send(
			"0x9c2126FD1F105e62E774780Fa47b94501AF11a36",
			{
				id: "red",
				emial: "red@gmail.com",
			}
		);
		const isRegistered = await getDeployed.isRegistered.call(
			"0x9c2126FD1F105e62E774780Fa47b94501AF11a36"
		);
		const userInfo = await getDeployed.getUser.call(
			"0x9c2126FD1F105e62E774780Fa47b94501AF11a36"
		);
		console.log(user, isRegistered, userInfo);
	});
});
