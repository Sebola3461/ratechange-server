import { Server } from "../core/Server";
import express, { json } from "express";
import timeout from "connect-timeout";
import { RouterManager } from "./RouterManager";
import { LoggerService } from "../helpers/terminal/LoggerService";

export class RateChangeServer {
  public axer: Server;
  public routerManager: RouterManager;
  public router;
  public logger = new LoggerService("RateChangeServer");

  constructor(axer: Server) {
    this.axer = axer;
    this.router = express();

    this.router.bind(this.router);

    this.routerManager = new RouterManager(this.axer, this);

    this.router.use("*", json());
    this.router.use(timeout("60s"));
  }

  listen() {
    this.routerManager.loadRoutes();

    this.router.listen(process.env.PORT || 3000, () => {
      this.logger.printSuccess(
        `Server running on port ${process.env.PORT || 3000}`
      );
    });
  }
}
