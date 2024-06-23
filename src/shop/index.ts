import {
    addBalance,
    formatBalance,
    getBalance,
    setBalance
} from "../data/balance";
import { formatItem, giveItem } from "../data/inventory";

export interface IShopItem {
    id: string;
    name: string;
    emoji: string;
    count: number;
    price: number;
}

export async function buyItem(uid: string, iid: string) {
    let balance = await getBalance(uid);

    const item = getShopItem(iid);
    if (!item) return "That item is not in the shop.";
    if (item.price > balance) return "You can't afford that.";

    await addBalance(uid, -item.price);
    await giveItem(uid, {
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        count: item.count
    });

    return `You bought ${formatItem(item)} for ${formatBalance(item.price)}.`;
}

export function getShopItem(id: string) {
    for (const item of shopItems) {
        if (item.id == id) {
            return item;
        }
    }
}

export const shopItems: IShopItem[] = [
    {
        id: "hamburger",
        name: "Hamburger",
        emoji: "🍔",
        count: 1,
        price: 6
    },
    {
        id: "hotdog",
        name: "Hot Dog",
        emoji: "🌭",
        count: 1,
        price: 4
    },
    {
        id: "taco",
        name: "Taco",
        emoji: "🌮",
        count: 1,
        price: 8
    },
    {
        id: "useless_box",
        name: "Useless Box",
        emoji: "📦",
        count: 1,
        price: 1
    }
];
