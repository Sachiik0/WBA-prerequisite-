import { Connection } from "@solana/web3.js"
import { BorshInstructionCoder } from "@coral-xyz/anchor";
import { IDL } from "../programs/wba_prereq";

const verifyTx = async() => {
  const connection = new Connection("https://api.devnet.solana.com");
  const tx = await connection.getTransaction('4KyFAtsu6BpVjvPKVRe8c36cPBKhednrp7A83EsneAKLe4hSws6e1XesqP2PzQYPprWEwWEU8RscjPVDBf3XD73u');
                                                                          
  if (tx) {
    // Verify the program ID called is the WBA program id
    // WBA program ID: WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq
    console.log("Program IDs:");
    tx.transaction.message.programIds().forEach(id => console.log(id.toString()));

    const ixs = tx.transaction.message.instructions;
    // Decodes the program instructions (in our case, the `complete` instruction)
    // https://coral-xyz.github.io/anchor/ts/classes/BorshInstructionCoder.html#format
    const coder = new BorshInstructionCoder(IDL);

    ixs.forEach(ix => {
      const msg = coder.decode(ix.data, "base58");
      console.log("instruction name: ", msg?.name);

      const ixData = msg?.data;
      // @ts-ignore
      // Typescript hack since it doesn't know that the `github` args exists in the
      // params to the `complete` instruction
      const githubBuffer = ixData?.github as Buffer;
      console.log("github username: ", githubBuffer.toString("utf8"));
    });
  }
};

verifyTx();