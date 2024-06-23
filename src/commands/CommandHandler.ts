import type Bot from "../mpp";
import type { Command } from "./Command";
import { commands } from "./commands";
import { prefixes } from "./prefixes";

export interface ICommandData {
    m: "a";
    a: string;
    p: {
        _id: string;
        id: string;
        name: string;
        color: string;
        tag?: {
            text: string;
            color: string;
        };
    };
    t: number;
    args: string[];
    argcat: string;
    usedPrefix: string;
    usedCommand: string;
}

export class CommandHandler {
    public static async handleCommand(
        bot: Bot,
        orig: {
            m: "a";
            a: string;
            p: {
                _id: string;
                id: string;
                name: string;
                color: string;
                tag?: {
                    text: string;
                    color: string;
                };
            };
            t: number;
        }
    ) {
        let usedPrefix;

        for (const prefix of prefixes) {
            if (orig.a.startsWith(prefix)) {
                usedPrefix = prefix;
                break;
            }
        }

        if (!usedPrefix) return;
        const args = orig.a.split(" ");
        const usedCommand = args[0].substring(usedPrefix.length);
        const argcat = orig.a.substring(args[0].length).trim();

        const msg: ICommandData = {
            m: orig.m,
            a: orig.a,
            p: orig.p,
            t: orig.t,
            args,
            argcat,
            usedPrefix,
            usedCommand
        };

        let foundCommand;

        for (const command of commands) {
            if (!command.aliases.includes(usedCommand)) continue;
            foundCommand = command;
        }

        if (!foundCommand) return `No such command: \`${usedCommand}\``;

        // TODO check permissions

        const out = await foundCommand.callback(msg, bot);
        return out;
    }
}
