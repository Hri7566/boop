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
        const p = bot.fuzzyFind(followID);
        if (!p) return `That user is not here.`;

        bot.cursor.followID = p._id;
        db.put("cursor.followID", p._id);

        return `Now following @${p._id}.`;
    }
);
