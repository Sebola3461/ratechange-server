import { config } from "dotenv";
config();
import { Server } from "./core/Server";

new Server().initialize();
