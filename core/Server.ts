import { RateChangeServer } from "../network/RateChangeServer";

export class Server {
  public server;

  constructor() {
    this.server = new RateChangeServer(this);
  }

  initialize() {
    this.server.listen();
  }
}
