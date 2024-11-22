"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("./winston.config");
const winston_logger_service_1 = require("./winston-logger.service");
let WinstonLoggerModule = class WinstonLoggerModule {
};
exports.WinstonLoggerModule = WinstonLoggerModule;
exports.WinstonLoggerModule = WinstonLoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot(winston_config_1.winstonConfig),
        ],
        providers: [winston_logger_service_1.WinstonLoggerService],
        exports: [winston_logger_service_1.WinstonLoggerService],
    })
], WinstonLoggerModule);
//# sourceMappingURL=winston-logger.module.js.map