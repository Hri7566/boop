import { db } from ".";

export async function getBalance(uid: string) {
    let bal;

    try {
        let str = await db.get(`balance~${uid}`);
        bal = parseFloat(str);
    } catch (err) {
        bal = 0;
    }

    return bal;
}

export async function setBalance(uid: string, bal: number) {
    try {
        db.put(`balance~${uid}`, bal.toString());
        return true;
    } catch (err) {
        return false;
    }
}

export function formatBalance(
    bal: number,
    currency: string = "$",
    left: boolean = true
) {
    if (left) {
        return `${currency}${bal.toFixed(2)}`;
    } else {
        return `${bal.toFixed(2)}${currency}`;
    }
}

export async function addBalance(uid: string, bal: number) {
    const balance = await getBalance(uid);
    setBalance(uid, bal + balance);
}
