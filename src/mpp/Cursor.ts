import { db } from "../data";
import type { Bot } from "./Bot";

export class Vector2 {
    constructor(public x: number = 0, public y: number = 0) {}
}

let followID = "ead940199c7d9717e5149919";
try {
    let savedID = await db.get("cursor.followID");
    if (savedID) followID = savedID;
} catch (err) {}

export class Cursor {
    public pos = new Vector2(50, 50);
    public vel = new Vector2();
    public deg = 0;
    public deg2 = 0;
    public offset = new Vector2(50, 50);
    public followID = followID;

    constructor(public bot: Bot) {}

    public sendPosition() {
        this.bot.client.sendArray([
            {
                m: "m",
                x: this.pos.x.toFixed(2),
                y: this.pos.y.toFixed(2)
            }
        ]);
    }

    public updateInterval = setInterval(() => {
        this.deg += 3;

        if (this.deg >= 360) {
            this.deg -= 360;
        }

        if (this.deg <= 0) {
            this.deg += 360;
        }

        this.deg2 += 4;

        if (this.deg2 >= 360) {
            this.deg2 -= 360;
        }

        if (this.deg2 <= 0) {
            this.deg2 += 360;
        }

        const rad = this.deg * (Math.PI / 180);
        const rad2 = this.deg2 * (Math.PI / 180);

        const part = Object.values(this.bot.client.ppl).find(
            p => p._id == this.followID
        );

        if (part) {
            this.offset.x = parseFloat(part.x);
            this.offset.y = parseFloat(part.y);
        } else {
            this.offset.x = 50;
            this.offset.y = 50;
        }

        if (
            this.offset.x > 98 ||
            this.offset.y > 98 ||
            this.offset.x < 2 ||
            this.offset.y < 2
        ) {
            this.offset.x = 50;
            this.offset.y = 50;
        }

        this.pos.x = Math.cos(rad) * 2.25 + this.offset.x;
        this.pos.y = Math.sin(rad2) * 4 + this.offset.y;
    }, 1000 / 60);

    public sendInterval = setInterval(() => {
        this.sendPosition();
    }, 1000 / 20);
}
