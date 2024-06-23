import { formatBalance, getBalance } from "../../../data/balance";
import { Command } from "../../Command";

export const balance = new Command(
    "balance",
    ["balance", "bal"],
    "Get your balance",
    "balance",
    async msg => {
        const bal = await getBalance(msg.p._id);
        return `Your balance: ${formatBalance(bal)}`;
    }
);
