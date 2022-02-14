import type { NextFunction, Opine, OpineRequest, OpineResponse } from "./deps.ts";
import { opine } from "./deps.ts";
import type {
  Controlled,
  ControllerDescriptor,
  FeatureDescriptor,
  GatewayAdapter,
  GatewayContext,
  GatewayMiddleware,
  Routed,
} from "../../core/gateway/types.ts";
import { Instance } from '../../core/types/reflect.ts';
import { HTTPOptions, RequestHandler } from 'https://deno.land/x/opine@2.1.1/src/types.ts';

export type OpineContext = GatewayContext<OpineRequest, OpineResponse>;
export type RouterInput = Routed<ControllerDescriptor & FeatureDescriptor> & Partial<Controlled>;

const noName = ([_, n]: [unknown, string?]) => !n;
const withName = (name: string) => ([_, n]: [unknown, string?]) => n === name;

export default class OpineAdapter implements GatewayAdapter<Opine> {
  private instance?: Opine;

  init() {
    this.instance = opine();
  }

  mount(path: string, router: Opine, to?: Opine) {
    (to ?? this.instance)?.use(path, router);
  }

  listen(opts: HTTPOptions) {
    return this.instance?.listen(opts);
  }

  router(routed: RouterInput): Opine {
    const router = opine();
    const toMiddleware = ([m]: [GatewayMiddleware, string?]) => this.middleware(m)

    // those with no name are the router level middlewares
    routed.middlewares.filter(noName).map(toMiddleware).forEach(m => router.use(m));

    (routed.desc?.methods ?? []).forEach(({name, path, method}) => {
      // find all middlewares for this method
      const mws = routed.middlewares.filter(withName(name)).map(toMiddleware);
      // @ts-ignore index access to a named method
      router[method.toLowerCase()](path, mws, this.endpoint(routed.instance, name));
    });
    return router;
  }

  middleware(m: GatewayMiddleware): RequestHandler {
    const get = this.context.bind(this);
    return async (req: OpineRequest, res: OpineResponse, next: NextFunction) => {
      try {
        await m.handle(get(req, res));
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  endpoint(instance: Instance, name: string) {
    return async (req: OpineRequest, res: OpineResponse) => {
      // need to get all the dependencies
      const data = await instance[name]();
      res.json(data);
    };
  }


  context(request: OpineRequest, response: OpineResponse): OpineContext {
    return {request, response};
  }
}
