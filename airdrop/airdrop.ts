import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

const wallet = require('./dev-wallet.json')

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        
        console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();

//https://explorer.solana.com/tx/2Q1AhW68M3H4DJfuW49fV3F7RAWrgajhj8bVb6XHPzErbqEam8JJLbKAY4x6XTUGiyDirLmjhcHWaEU3rdKucLDo?cluster=devnet
