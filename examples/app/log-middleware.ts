import { GatewayContext, GatewayMiddleware } from '../../packages/core/gateway/types.ts';
import { Injectable } from '../../packages/core/njinn/decorators.ts';

@Injectable()
export default class LogMiddleware implements GatewayMiddleware {
  handle(ctx: GatewayContext) {
    console.log('>>> Ive been called');
    return ctx;
  }
}
