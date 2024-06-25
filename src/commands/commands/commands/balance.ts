import { formatBalance, getBalance } from "../../../data/balance";
import { Command } from "../../Command";

export const balance = new Command(
    "balance",
    ["balance", "bal"],
    "Get your own (or someone else's) balance",
    "balance [user]",
    async (msg, bot) => {
        if (msg.args[1]) {
            const p = bot.fuzzyFind(msg.args[1]);
            if (!p) return "That user is not here.";
            const bal = await getBalance(p._id);
            return `@${p._id}'s balance: ${formatBalance(bal)}`
        } else {
            const bal = await getBalance(msg.p._id);
            return `Your balance: ${formatBalance(bal)}`;
        }
    }
);
