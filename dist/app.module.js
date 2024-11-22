"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const merchants_module_1 = require("./merchants/merchants.module");
const config_1 = require("@nestjs/config");
const winston_logger_module_1 = require("./winston-logger/winston-logger.module");
const winston_logger_service_1 = require("./winston-logger/winston-logger.service");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
    constructor(winstonLoggerService) {
        this.winstonLoggerService = winstonLoggerService;
    }
    onModuleInit() {
        this.winstonLoggerService.logInfo('AppModule initialized');
        this.winstonLoggerService.logError('Sample error log');
        this.winstonLoggerService.logDebug('Debugging log message');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '/src/uploads'),
                serveRoot: '/uploads',
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './config/.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: `${configService.get('DATABASE_PROTOCOL')}://${configService.get('DATABASE_HOST')}:${configService.get('DATABASE_PORT')}/${configService.get('DATABASE_NAME')}`,
                }),
            }),
            merchants_module_1.MerchantsModule,
            winston_logger_module_1.WinstonLoggerModule,
            throttler_1.ThrottlerModule.forRoot([{
                    name: 'short',
                    ttl: 1000,
                    limit: 3,
                }, {
                    name: 'long',
                    ttl: 60000,
                    limit: 100,
                }]),
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ]
    }),
    __metadata("design:paramtypes", [winston_logger_service_1.WinstonLoggerService])
], AppModule);
//# sourceMappingURL=app.module.js.map