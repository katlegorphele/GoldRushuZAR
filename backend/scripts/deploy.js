const {ethers} = require('hardhat');

async function main() {
    const [singer] = await ethers.getSigners();
    const Lottery = await ethers.deployContract('Lottery');
    await Lottery.waitForDeployment();

    console.log(`Contract deployed to: ${Lottery.target} by address: ${singer.address}`)
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});