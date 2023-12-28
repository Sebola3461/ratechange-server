import { join, resolve } from "path";
import { Route, RouteMethod } from "../struct/Route";
import { existsSync, readdirSync } from "fs";

export const DownloadBeatmap = new Route(
  "/ratechange/download/:fileId",
  RouteMethod.GET
).setExecutable((axer, route, req, res) => {
  const fileId = req.params.fileId;

  if (!fileId) return route.handleError(res, 400, "Invalid form body");

  const basePath = resolve(
    join(process.env.AXERBOT_RATECHANGE_OUTPUT_PATH as string, "osz", fileId)
  );

  if (!existsSync(basePath))
    return route.handleError(res, 404, "File not found or expired!");

  const basePathContents = readdirSync(basePath);
  const oszFileName = basePathContents.find((file) => file.endsWith(".osz"));

  if (!oszFileName)
    return route.handleError(res, 404, "File not found or expired!");

  res.status(200).download(resolve(join(basePath, oszFileName)));
});
