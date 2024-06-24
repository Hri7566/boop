import Client from "mpp-client-net";
import Bot from "./mpp";
import { env } from "./env";
import { prefixes } from "./commands/prefixes";
import { loadConfig } from "./util/config";

const tokenGroups = new Map();
tokenGroups.set("MPPNET", env.MPPNET_TOKEN);

interface BotConfig {
    uri: string;
    channel: string;
    name: string;
    color: string;
    tokenGroup: string;
}

const configs = loadConfig<BotConfig[]>("./config/bots.yml", [
    {
        uri: "wss://mppclone.com:8443",
        channel: ":skul:",
        name: "beep boop 🤖 " + prefixes[0] + "help",
        color: "#480505",
        tokenGroup: "MPPNET"
    }
]);

const bots: Bot[] = [];

for (const config of configs) {
    const cl = new Client(config.uri, tokenGroups.get(config.tokenGroup));
    const bot = new Bot(cl, config.channel, {
        name: config.name,
        color: config.color
    });

    bot.start();

    bots.push(bot);
}

