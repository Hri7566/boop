import { stopWorking } from "../../../work";
import { Command } from "../../Command";

export const stopworking = new Command(
    "stopworking",
    ["stopworking", "stopwork", "sw"],
    "Stop working",
    "stopworking",
    async (msg, bot) => {
        const text = stopWorking(msg.p._id);
        return text;
    }
);
