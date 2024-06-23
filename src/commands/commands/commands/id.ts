import { Command } from "../../Command";

export const id = new Command(
    "id",
    ["id"],
    "Get your user ID",
    "id",
    async msg => {
        return `Your user ID: \`${msg.p._id}\``;
    }
);
