import { startWorking } from "../../../work";
import { Command } from "../../Command";

export const work = new Command(
    "work",
    ["work", "w"],
    "Start working",
    "work",
    async (msg, bot) => {
        const text = startWorking(msg.p._id, bot);
        return text;
    }
);
