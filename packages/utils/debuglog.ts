import devLogger from "../common/logger/dev.ts";

export type DebugLog = (msg: string, ...args: unknown[]) => void;

const DEBUG_ENV_KEY = "DEBUG";
const DEBUG_ENV_SEP = ",";

const noop: DebugLog = () => {
};

export default function debuglog(context: string): DebugLog {
  const debug = Deno.env.get(DEBUG_ENV_KEY);
  if (!debug) {
    return noop;
  }

  context = context.toUpperCase();
  const parts = debug.toUpperCase().split(DEBUG_ENV_SEP);
  if (!parts.includes(context)) {
    return noop;
  }
  const logger = devLogger(context);

  return (msg: string, ...args: unknown[]) => {
    logger.i;
  };
}
