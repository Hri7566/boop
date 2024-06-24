import YAML from "yaml";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path/posix";

export function loadConfig<T>(path: string, defaults: T) {
    try {
        if (existsSync(path)) {
            const data = readFileSync(path).toString();
            const config = YAML.parse(data);

            return config as T;
        } else {
            const dir = dirname(path);

            if (!existsSync(dir)) {
                mkdirSync(dir);
            }

            writeFileSync(path, YAML.stringify(defaults));
            return defaults as T;
        }
    } catch (err) {
        console.warn(err);
        return defaults as T;
    }
}
