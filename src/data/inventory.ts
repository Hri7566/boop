import { db } from ".";

export interface IItem {
    id: string;
    emoji: string;
    name: string;
    count: number;
}

export type TInventory = IItem[];

export async function getInventory(uid: string) {
    let inv: TInventory;

    try {
        let str = await db.get(`inventory~${uid}`);
        inv = JSON.parse(str);
    } catch (err) {
        inv = [];
    }

    return inv;
}

export async function setInventory(uid: string, inv: TInventory) {
    try {
        db.put(`inventory~${uid}`, JSON.stringify(inv));
        return true;
    } catch (err) {
        return false;
    }
}

export function formatItem(item: IItem, useCount: boolean = true) {
    if (item.count > 1 && useCount) {
        return `${item.emoji || ""}${item.name || item.id} (x${item.count})`;
    } else {
        return `${item.emoji || ""}${item.name || item.id}`;
    }
}

export function formatInventory(inv: TInventory) {
    const items: string[] = [];

    for (const item of inv) {
        items.push(formatItem(item));
    }

    return items.join(` | `) || "(none)";
}

export function compactInventory(inv: TInventory) {
    const newinv: Record<string, IItem> = {};

    // Loop through every item
    for (const item of inv) {
        // Gather a total of every item
        if (!newinv[item.id] && item.count > 0) {
            newinv[item.id] = {
                id: item.id,
                name: item.name,
                emoji: item.emoji,
                count: item.count
            };
        }

        if (newinv[item.id]) {
            newinv[item.id].count += item.count;
        }
    }

    return Object.values(newinv).filter(it => typeof it !== "undefined");
}

export function hasItem(inv: TInventory, itemID: IItem["id"]) {
    for (const item of inv) {
        if (item.id == itemID) {
            return true;
        }
    }

    return false;
}

export async function giveItem(uid: string, item: IItem) {
    const inv = await getInventory(uid);

    if (item.count <= 0) {
        if (hasItem(inv, item.id)) {
            for (const it of inv) {
                if (it.id == item.id) {
                    if (it.count > item.count) {
                        it.count += item.count;
                    }

                    if (it.count == item.count) {
                        removeItem(inv, item.id);
                    }
                }
            }
        }
    } else {
        if (hasItem(inv, item.id)) {
            for (const it of inv) {
                if (it.id == item.id) {
                    it.count += item.count;
                }
            }
        } else {
            inv.push(item);
        }
    }

    await setInventory(uid, inv);
}

export async function removeItem(inv: TInventory, iid: string) {
    for (let i = 0; i < inv.length; i++) {
        if (inv[i].id == iid) {
            inv.splice(i, 1);
        }
    }
}
