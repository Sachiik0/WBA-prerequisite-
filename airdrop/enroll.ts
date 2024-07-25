import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, WbaPrereq } from "../programs/wba_prereq";

const wallet = require('./wba-wallet.json');

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("Sachiik0", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
    commitment: "confirmed"
});

const programId = new PublicKey('WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq'); // Replace with your actual program ID
const program = new Program<WbaPrereq>(IDL, provider);

const enrollment_seeds = [
    Buffer.from("prereq"),
    keypair.publicKey.toBuffer()
];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, programId);

(async () => {
    try {
        const txhash = await program.methods
            .complete(github)
            .accounts({
                signer: keypair.publicKey,
            })
            .signers([keypair])
            .rpc();

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        
            console.error(`Oops, something went wrong: ${e}`);

    }
})();


//https://explorer.solana.com/tx/4KyFAtsu6BpVjvPKVRe8c36cPBKhednrp7A83EsneAKLe4hSws6e1XesqP2PzQYPprWEwWEU8RscjPVDBf3XD73u?cluster=devnet
