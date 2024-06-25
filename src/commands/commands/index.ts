import type { Command } from "../Command";
import { about } from "./commands/about";
import { balance } from "./commands/balance";
import { buy } from "./commands/buy";
import { eat } from "./commands/eat";
import { follow } from "./commands/follow";
import { help } from "./commands/help";
import { id } from "./commands/id";
import { inventory } from "./commands/inventory";
import { money } from "./commands/money";
import { shop } from "./commands/shop";
import { stopworking } from "./commands/stopworking";
import { unfollow } from "./commands/unfollow";
import { work } from "./commands/work";

export const commands: Command[] = [
    help,
    about,
    id,
    follow,
    balance,
    inventory,
    shop,
    buy,
    eat,
    unfollow,
    work,
    stopworking
];
