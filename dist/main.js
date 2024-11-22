"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cors = require("cors");
const express = require("express");
const constants_1 = require("./utility/constants");
const all_exceptions_filter_1 = require("./all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors({
        origin: [constants_1.Constants.ORIGIN_URL.MERCHANTS_3000, constants_1.Constants.ORIGIN_URL.MERCHANTS_3002, 'http://localhost:8100'],
        methods: constants_1.Constants.SERVER.ALLOWED_METHOD,
        credentials: true,
    }));
    app.use(express.json());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(httpAdapter));
    await app.listen(constants_1.Constants.SERVER.RUNNING_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map