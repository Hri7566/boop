import Client from "mpp-client-net";
import Bot from "./mpp";
import { env } from "./env";

const cl = new Client("wss://mppclone.com:8443", env.MPPNET_TOKEN);

const bot = new Bot(cl, "keller room", {
    name: "beep boop 🤖 .help",
    color: "#480505"
});

bot.start();
