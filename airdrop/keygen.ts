import { Keypair } from "@solana/web3.js";
// Now we're going to create a new Keypair, like so:
// //Generate a new keypair
let kp = Keypair.generate()

console.log(`You've generated a new Solana wallet:
${kp.publicKey.toBase58()}[${kp.secretKey}]`)
// To save your wallet, copy and paste the following into a JSON file:
