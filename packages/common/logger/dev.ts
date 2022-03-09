import type { LevelName, LogRecord } from "../../deps/log.ts";
import { handlers, Logger } from "../../deps/log.ts";
import {
  blue,
  brightGreen,
  brightMagenta,
  brightRed,
  brightYellow,
  cyan,
  green,
  red,
  reset,
} from "../../deps/colors.ts";
import { format } from "../../deps/datetime.ts";
import { sprintf } from "../../deps/fmt.ts";

const LEVELS: Record<string, string> = {
  "DEBUG": blue("DBG"),
  "INFO": brightGreen("INF"),
  "WARNING": brightYellow("WRN"),
  "ERROR": red("ERR"),
  "CRITICAL": brightRed("CRT"),
};

export { Logger };

const formatter = ({ levelName, msg, datetime, args, loggerName }: LogRecord) =>
  [
    green(format(datetime, "HH:mm:ss.SSS")),
    reset(LEVELS[levelName]),
    brightMagenta(`[${loggerName}]`),
    cyan(sprintf(msg, ...args)),
  ].join(" ");

export default function devLogger(name = "DEV", level: LevelName = "DEBUG") {
  return new Logger(
    name,
    level,
    { handlers: [new handlers.ConsoleHandler("DEBUG", { formatter })] },
  );
}
