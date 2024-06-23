import { commands } from "..";
import { Command } from "../../Command";

export const help = new Command(
    "help",
    ["help", "h", "commands", "cmds"],
    "List commands",
    "help [command]",
    async msg => {
        if (msg.args[1]) {
            let foundCommand;

            for (const command of commands) {
                if (!command.aliases.includes(msg.argcat)) continue;
                foundCommand = command;
                break;
            }

            if (!foundCommand) return `No help for command \`${msg.argcat}\`.`;
            return `Description: ${foundCommand.description} | Usage: \`${msg.usedPrefix}${foundCommand.usage}\``;
        } else {
            let start = "Commands: ";
            const list: string[] = [];

            for (const command of commands) {
                list.push(`\`${msg.usedPrefix}${command.aliases[0]}\``);
            }

            return start + list.join(" | ");
        }
    }
);
