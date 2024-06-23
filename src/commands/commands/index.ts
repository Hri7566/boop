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
import { unfollow } from "./commands/unfollow";

export const commands: Command[] = [
    help,
    about,
    id,
    follow,
    balance,
    inventory,
    money,
    shop,
    buy,
    eat,
    unfollow
];
