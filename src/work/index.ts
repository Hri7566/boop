import { addBalance, formatBalance } from "../data/balance";
import type Bot from "../mpp";

export interface WorkUser {
    uid: string;
    bot: Bot;
}

export const workingUsers: WorkUser[] = [];

export function startWorking(uid: string, bot: Bot) {
    if (isWorking(uid)) return `You are already working.`;

    workingUsers.push({ uid, bot });

    return "You started working.";
}

export function isWorking(uid: string) {
    return !!workingUsers.find(w => w.uid == uid);
}

export async function finishWorking(uid: string, bot?: Bot) {
    const money = parseFloat((Math.random() * 100).toFixed(2));

    stopWorking(uid);
    await addBalance(uid, money);

    const out = `@${uid} finished working and earned ${formatBalance(money)}.`;

    if (bot) bot.sendChat(out);

    return out;
}

export function stopWorking(uid: string) {
    if (!isWorking(uid)) return "You are not working.";
    const workUser = workingUsers.find(w => w.uid == uid);
    if (!workUser) return "You are not working.";
    workingUsers.splice(workingUsers.indexOf(workUser), 1);
    return "You stopped working.";
}

let workingInterval: Timer;

export function startWorkingInterval() {
    workingInterval = setInterval(async () => {
        if (workingUsers.length < 1) return;

        const r = Math.random();

        if (r < 0.1) {
            const winner =
                workingUsers[Math.floor(Math.random() * workingUsers.length)];

            await finishWorking(winner.uid, winner.bot);
        }
    }, 5000);
}
