import { formatBalance } from "../data/balance";

export const workingUsers: string[] = [];

export function startWorking(uid: string) {
    if (isWorking(uid)) return `You are already working.`;

    workingUsers.push(uid);
}

export function isWorking(uid: string) {
    if (workingUsers.includes(uid)) {
        return true;
    }

    return false;
}

export function finishWorking(uid: string) {
    const money = parseFloat((Math.random() * 100).toFixed(2));

    stopWorking(uid);

    return `@${uid} finished working and earned ${formatBalance(money)}.`;
}

export function stopWorking(uid: string) {}

let workingInterval: NodeJS.Timer;

export function startWorkingInterval() {
    setInterval(() => {
        if (workingUsers.length < 1) return;

        const r = Math.random();

        if (r < 0.1) {
            const winner =
                workingUsers[Math.floor(Math.random() * workingUsers.length)];

            finishWorking(winner);
        }
    }, 5000);
}
