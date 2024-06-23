import { Command } from "../../Command";

export const about = new Command(
    "about",
    ["about", "info"],
    "Get bot info",
    "about",
    async msg => {
        return `This bot was made by Hri7566.`;
    }
);
