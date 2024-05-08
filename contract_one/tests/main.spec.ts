import { Cell, toNano } from "@ton/core";
import { hex } from "../build/main.compiled.json";
import { Blockchain } from "@ton-community/sandbox";
import { MainContract } from "../wrappers/MainContract";

describe("main.fc contract tests", () => {
  it("our first test", async () => {
    const blockchain = await Blockchain.create();

    const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];

    const myContract = blockchain.openContract(
      await MainContract.createFromConfig({}, codeCell)
    );

    const senderWallet = await blockchain.treasury("sender");

    myContract.sendInternalMessage(senderWallet.getSender(), toNano("0.05"));
  });
});
