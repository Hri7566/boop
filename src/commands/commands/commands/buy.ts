import { buyItem, shopItems } from "../../../shop";
import { Command } from "../../Command";

export const buy = new Command(
    "buy",
    ["buy"],
    "Buy an item in the shop",
    "buy <item name>",
    async msg => {
        if (!msg.args[1]) return `Specify an item to buy.`;

        let itemID;

        for (const item of shopItems) {
            if (item.name.toLowerCase().includes(msg.argcat.toLowerCase())) {
                itemID = item.id;
            }
        }

        if (!itemID) return "That item is not in the shop.";

        return await buyItem(msg.p._id, itemID);
    }
);
