import Client from "mpp-client-net";
import Bot from "./mpp";
import { env } from "./env";
import { prefixes } from "./commands/prefixes";

const cl = new Client("wss://mppclone.com:8443", env.MPPNET_TOKEN);

const bot = new Bot(cl, ":skul:", {
    name: "beep boop 🤖 " + prefixes[0] + "help",
    color: "#480505"
});

bot.start();
