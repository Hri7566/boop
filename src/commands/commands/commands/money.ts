import { addBalance, formatBalance } from "../../../data/balance";
import { Command } from "../../Command";

let answers = [
    `You were given &MONEY, for some reason.`,
    `For an unknown reason, you got &MONEY.`,
    `You now have &MONEY more money than before, for some reason.`,
    `You were chaotically given &MONEY.`,
    `The world decided you needed &MONEY.`,
    `Here, have &MONEY, for some reason...`,
    `You want &MONEY? Here you go!`,
    `This command is going to be deleted. By the way, you got &MONEY.`,
    `You wanted money, so you got &MONEY.`
];

export const money = new Command(
    "money",
    ["money"],
    "Give yourself money, for some reason",
    "id",
    async msg => {
        const answer = answers[Math.floor(Math.random() * answers.length)];
        const money = parseFloat((Math.random() * 50).toFixed(2));

        await addBalance(msg.p._id, money);

        return answer.split("&MONEY").join(formatBalance(money));
    }
);
