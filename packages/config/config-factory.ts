import { Resolver } from "../njinn/elf/types.ts";
import { config, ConfigOptions } from "./deps.ts";

export const CONFIG_OPTION_TOKEN = Symbol("config-option-token");
export const CONFIG_DATA_TOKEN = Symbol("config-data-token");

export const configFactory = async (resolver: Resolver) => {
  const options = await resolver.resolve<ConfigOptions>(CONFIG_OPTION_TOKEN);
  console.log(">>>", options);
  return new Map(Object.entries(await config(options)));
};
