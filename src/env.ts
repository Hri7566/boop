import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    isServer: true,
    server: {
        MPPNET_TOKEN: z.string()
    },
    runtimeEnv: process.env
});
