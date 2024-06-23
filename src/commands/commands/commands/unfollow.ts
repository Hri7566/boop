import { db } from "../../../data";
import { Command } from "../../Command";

export const unfollow = new Command(
    "unfollow",
    ["unfollow", "unf"],
    "Unfollow a user's cursor",
    "unfollow",
    async (msg, bot) => {
        const old = bot.cursor.followID;
        const followID = "";

        bot.cursor.followID = followID;
        db.put("cursor.followID", followID);

        return `Unfollowed @${old}.`;
    }
);
