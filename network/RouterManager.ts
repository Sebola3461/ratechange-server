import { Server } from "../core/Server";
import { LoggerService } from "../helpers/terminal/LoggerService";
import { RateChangeServer } from "./RateChangeServer";
import { AvailableRoutes } from "./routes";
import { Route, RouteMethod } from "./struct/Route";

export class RouterManager {
  public routes: Route[] = [];
  public axer: Server;
  public server: RateChangeServer;
  private logger = new LoggerService("RouteManager");

  constructor(axer: Server, server: RateChangeServer) {
    this.axer = axer;
    this.server = server;
  }

  loadRoutes() {
    this.routes = AvailableRoutes;

    for (const route of this.routes) {
      switch (route.method) {
        case RouteMethod.POST:
          this.server.router.post.bind(this.server.router)(
            route.path,
            (req, res) => route.execute(this.axer, req, res)
          );
          break;
        case RouteMethod.GET:
          this.server.router.get.bind(this.server.router)(
            route.path,
            (req, res) => route.execute(this.axer, req, res)
          );
          break;
        case RouteMethod.DELETE:
          this.server.router.delete.bind(this.server.router)(
            route.path,
            (req, res) => route.execute(this.axer, req, res)
          );
          break;
        case RouteMethod.PATCH:
          this.server.router.patch.bind(this.axer.server.router)(
            route.path,
            (req, res) => route.execute(this.axer, req, res)
          );
          break;
      }

      this.logger.printInfo(`Initialized::[${route.path}]`);
    }
  }
}
