import { formatItem, getInventory } from "../../../data/inventory";
import { runItemBehavior } from "../../../items";
import { buyItem, shopItems } from "../../../shop";
import { Command } from "../../Command";

export const eat = new Command(
    "eat",
    ["eat"],
    "Eat an item from your inventory.",
    "eat <item name>",
    async (msg, bot) => {
        const inv = await getInventory(msg.p._id);

        if (!msg.args[1]) return `Specify an item to buy.`;

        let item;

        for (const it of inv) {
            if (it.name.toLowerCase().includes(msg.argcat.toLowerCase())) {
                item = it;
            }
        }

        if (!item) return `You don't have any "${msg.argcat}" to eat.`;

        try {
            return await runItemBehavior(item, "eat", msg.p._id, bot);
        } catch (err) {
            return `You can't eat the ${formatItem(item, false)}.`;
        }
    }
);
