import { Route, RouteMethod } from "../struct/Route";

export const Ping = new Route("/ping", RouteMethod.GET).setExecutable(
  (axer, route, req, res) => {
    res.status(200).send({ status: 200, statusText: "Pong!" });
  }
);
