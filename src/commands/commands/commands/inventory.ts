import {
    compactInventory,
    formatInventory,
    getInventory,
    setInventory
} from "../../../data/inventory";
import { Command } from "../../Command";

export const inventory = new Command(
    "inventory",
    ["inventory", "inv"],
    "Get your own (or someone else's) inventory",
    "inventory [user ID]",
    async (msg, bot) => {
        if (msg.args[1]) {
            const p = bot.fuzzyFind(msg.args[1]);
            if (!p) return "That user is not here.";
            return `@${p._id}'s inventory: ${formatInventory(await getInventory(p._id))}`
        } else {
            // const inv = await getInventory(msg.p._id);
            // await setInventory(msg.p._id, compactInventory(inv));
            return `Your inventory: ${formatInventory(await getInventory(msg.p._id)) || "(none)"}`;
        }
    }
);
