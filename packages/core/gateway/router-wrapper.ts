import { GatewayRouter } from "./types.ts";

export default class RouterWrapper implements GatewayRouter {
  use(path: string, router: GatewayRouter) {
  }
}
