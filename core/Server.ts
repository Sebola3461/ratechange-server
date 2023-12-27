import { SpectroServer } from "../network/SpectroServer";

export class Server {
  public server;

  constructor() {
    this.server = new SpectroServer(this);
  }

  initialize() {
    this.server.listen();
  }
}
