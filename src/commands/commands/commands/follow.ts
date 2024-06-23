import { db } from "../../../data";
import { Command } from "../../Command";

export const follow = new Command(
    "follow",
    ["follow", "f"],
    "Follow a user's cursor",
    "follow <user ID>",
    async (msg, bot) => {
        if (!msg.args[1])
            return `See \`${msg.usedPrefix}help follow\` for usage.`;

        const followID = msg.args[1];

        let p = Object.values(bot.client.ppl).find(p => p._id == followID);
        if (!p) return `That user is not here.`;

        bot.cursor.followID = followID;
        db.put("cursor.followID", followID);

        return `Now following @${p._id}.`;
    }
);
