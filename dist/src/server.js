"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initBaseConfig();
        this.initRouterConfig(controllers);
    }
    initBaseConfig() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json({ limit: '1mb' }));
        this.app.use(cors_1.default());
    }
    async initRouterConfig(controllers) {
        controllers.forEach((controller) => {
            this.app.use(`/api/v1/${controller.path}`, controller.router);
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map