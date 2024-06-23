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
    "Get your inventory",
    "inventory",
    async msg => {
        // const inv = await getInventory(msg.p._id);
        // await setInventory(msg.p._id, compactInventory(inv));
        return `Your inventory: ${
            formatInventory(await getInventory(msg.p._id)) || "(none)"
        }`;
    }
);
