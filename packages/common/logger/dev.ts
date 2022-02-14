import type { LogRecord } from "jinn/common/deps/log.ts";
import { handlers, Logger } from "jinn/common/deps/log.ts";
import {
  blue,
  brightGreen,
  brightMagenta,
  brightRed,
  brightYellow,
  cyan,
  gray,
  green,
  red,
  reset,
} from "jinn/common/deps/colors.ts";
import { format } from "jinn/common/deps/datetime.ts";
import { sprintf } from "jinn/common/deps/fmt.ts";
import { LevelName } from "https://deno.land/std@0.125.0/log/levels.ts";

const LEVELS: Record<string, string> = {
  "DEBUG": blue("DBG"),
  "INFO": brightGreen("INF"),
  "WARNING": brightYellow("WRN"),
  "ERROR": red("ERR"),
  "CRITICAL": brightRed("CRT"),
};
export { Logger };

export function devLogger(name: string = "DEV", level: LevelName = "DEBUG") {
  return new Logger(name, level, {
    handlers: [
      new handlers.ConsoleHandler("DEBUG", {
        formatter: ({ levelName, msg, datetime, args, loggerName }: LogRecord) => {
          return [
            green(format(datetime, "HH:mm:ss.SSS")),
            reset(LEVELS[levelName]),
            brightMagenta(`[${loggerName}]`),
            cyan(sprintf(msg, ...args)),
          ].join(" ");
        },
      }),
    ],
  });
}
