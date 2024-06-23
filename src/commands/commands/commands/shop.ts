import { formatBalance } from "../../../data/balance";
import { formatItem } from "../../../data/inventory";
import { shopItems } from "../../../shop";
import { Command } from "../../Command";

export const shop = new Command(
    "shop",
    ["shop"],
    "Look at the shop",
    "shop",
    async msg => {
        let items: string[] = [];

        for (const item of shopItems) {
            items.push(`${formatItem(item)}: ${formatBalance(item.price)}`);
        }

        return `Shop: ${items.join(" | ")}`;
    }
);
