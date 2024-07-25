import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js"

const wallet = require('./dev-wallet.json');

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");


(async () => {
    try {
        const from = keypair;
        const to = new PublicKey('41ywsxNiW27shHcaHJ5fLc2KbMaoqMoSWkDNnzS9Fgzm'); // Replace with the destination public key

        // Get balance of dev wallet
        const balance = await connection.getBalance(from.publicKey);

        // Create a test transaction to calculate fees
        let transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance,
            })
        );

        const { blockhash } = await connection.getLatestBlockhash('confirmed');
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = from.publicKey;

        // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
        const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;

        // Remove our transfer instruction to replace it
        transaction.instructions.pop();

        // Now add the instruction back with correct amount of lamports
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );

        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();

//https://explorer.solana.com/tx/29TFJRRj8tfxrKcWQaKyeQN7hJaykpRS9UTLdrwZNGyTEjTjN7rDGfTCjbNCnWMnQBNwVeNtR6krJfGotYuAXcEp?cluster=devnet
//https://explorer.solana.com/tx/28BVEmyJyf1WFMcRN99ETd2qbGs9tTMtS4UYhyfNpFWdr1TGCBViouP63wgdz5i5jShzvpSPDyqHQ5SjaDBUpWvq?cluster=devnet
