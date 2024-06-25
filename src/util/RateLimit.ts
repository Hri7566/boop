export class RateLimit {
    protected after = 0;
    constructor(protected interval_ms: number) { }

    public attempt(t?: number) {
        const time = t || Date.now();

        if (time < this.after) return false;
        this.after = time + this.interval_ms;

        return true;
    }

    public setInterval(ms: number) {
        this.interval_ms = ms;
    }

    public getInterval() {
        return this.interval_ms;
    }
}

export class RateLimitChain {
    protected chain: RateLimit[] = [];

    constructor(num: number, interval_ms: number) {
        this.setNumAndInterval(num, interval_ms);
    }

    public attempt(t?: number) {
        const time = t || Date.now();

        for (let i = 0; i < this.chain.length; i++) {
            if (this.chain[i].attempt(time)) return true;
        }
    }

    public setNumAndInterval(n: number, ms: number) {
        for (let i = 0; i < n; i++) {
            this.chain.push(new RateLimit(ms));
        }
    }
}

export class DataRateLimit {
    protected after = 0;
    protected size = 0;

    constructor(protected limit: number, protected interval_ms: number) { }

    public attempt(size: number, t?: number) {
        const time = t || Date.now();

        if (time >= this.after) {
            this.size = 0;
            this.after = time + this.interval_ms;
        }

        if (this.size + size <= this.limit) {
            this.size += size;
            return true;
        } else {
            return false;
        }
    }
}
