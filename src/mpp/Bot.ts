import { Client } from "mpp-client-net";
import CommandHandler from "../commands";
import { Cursor } from "./Cursor";
import { RateLimitChain } from "../util/RateLimit";

export class Bot {
    public cursor = new Cursor(this);

    constructor(
        public client: Client,
        public desiredChannel: string,
        public desiredUser: {
            name: string;
            color: string;
        }
    ) {
        this.bindEventListeners();
        this.client.setChannel(this.desiredChannel);
    }

    public start() {
        this.client.start();
    }

    public stop() {
        this.client.stop();
    }

    private bindEventListeners() {
        this.client.on("hi", msg => {
            console.log("Client connected");
        });

        this.client.on("a", async msg => {
            try {
                const out = await CommandHandler.handleCommand(this, msg);
                if (out) this.sendChat(out);
            } catch (err) {
                if (err) this.sendChat(err.toString());
            }
        });

        this.client.on("t", msg => {
            this.fixUser();
        });

        this.client.on("ch", msg => {
            this.fixUser();
        });
    }

    public fixUser() {
        const me = this.client.getOwnParticipant();
        if (
            me.name !== this.desiredUser.name ||
            me.color !== this.desiredUser.color
        ) {
            this.client.sendArray([
                {
                    m: "userset",
                    set: this.desiredUser
                }
            ]);
        }
    }

    public chatRateLimit = new RateLimitChain(4, 6000);

    public sendChat(text: string) {
        if (!this.chatRateLimit.attempt()) {
            setTimeout(() => {
                this.sendChat(text);
            }, 1000);
        } else {
            this.client.sendArray([
                {
                    m: "a",
                    message: `\u034f${text.substring(0, 512)}`
                }
            ]);
        }
    }

    public fuzzyFind(text: string) {
        for (const p of Object.values(this.client.ppl)) {
            if (p.name.toLowerCase().includes(text.toLowerCase()) || p._id.toLowerCase().includes(text.toLowerCase())) return p;
        }
    }
}
