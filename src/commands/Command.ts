import type Bot from "../mpp";
import type { ICommandData } from "./CommandHandler";

export type TCommandCallback = (
    msg: ICommandData,
    bot: Bot
) => Promise<string | void>;

export class Command {
    constructor(
        public id: string,
        public aliases: string[],
        public description: string,
        public usage: string,
        public callback: TCommandCallback
    ) {}
}
