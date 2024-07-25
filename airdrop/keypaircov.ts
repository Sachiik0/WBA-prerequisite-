import {Keypair} from '@solana/web3.js'
import bs58 from 'bs58'


const keypair = Keypair.fromSecretKey(
    bs58.decode(
        "your private key"
    )
    );

console.log(keypair)
