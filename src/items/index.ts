import { formatItem, giveItem, type IItem } from "../data/inventory";
import type Bot from "../mpp";

export interface IBehaviorData {
    item: IItem;
    userID: string;
}

export type TBehaviorCallback = (
    msg: IBehaviorData,
    bot: Bot
) => Promise<string | void>;

export interface IItemBehavior {
    behavior: string;
    callback: TBehaviorCallback;
}

export async function runItemBehavior(
    item: IItem,
    behavior: string,
    uid: string,
    bot: Bot
) {
    const bhv = findItemBehavior(item.id, behavior);
    if (!bhv) throw new Error(`Unknown behavior: ${item.id}.${behavior}`);

    const out = await bhv.callback(
        {
            item,
            userID: uid
        },
        bot
    );

    return out;
}

export function findItemBehavior(iid: string, bhv: string) {
    if (!itemBehaviors[iid]) return;

    for (const b of itemBehaviors[iid]) {
        if (b.behavior == bhv) {
            return b;
        }
    }
}

export const standardBehaviors: Record<
    IItemBehavior["behavior"],
    IItemBehavior
> = {
    eat: {
        behavior: "eat",
        callback: async msg => {
            let item: IItem = {
                id: msg.item.id,
                name: msg.item.name,
                emoji: msg.item.emoji,
                count: -1
            };

            await giveItem(msg.userID, item);

            let answers = [
                `You ate the $ITEM and it went into your belly.`,
                `You ate the $ITEM and now you feel full.`,
                `You ate the $ITEM.`,
                `Suddenly, you decide to eat a(n) $ITEM.`,
                `You eat the $ITEM, and then your stomach feels full.`,
                `Your belly likes the $ITEM.`
            ];

            const itemText = formatItem(item, false);

            return answers[Math.floor(Math.random() * answers.length)]
                .split("$ITEM")
                .join(itemText);
        }
    }
};

export const itemBehaviors: Record<IItem["id"], IItemBehavior[]> = {
    hamburger: [standardBehaviors.eat],
    hotdog: [standardBehaviors.eat],
    taco: [standardBehaviors.eat],
    useless_box: []
};
