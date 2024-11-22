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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantsController = void 0;
const common_1 = require("@nestjs/common");
const merchants_service_1 = require("./merchants.service");
const platform_express_1 = require("@nestjs/platform-express");
const winston_logger_service_1 = require("../winston-logger/winston-logger.service");
let MerchantsController = class MerchantsController {
    constructor(merchantsService, winstonLoggerService) {
        this.merchantsService = merchantsService;
        this.winstonLoggerService = winstonLoggerService;
    }
    async findAll() {
        this.winstonLoggerService.logInfo('Merchant Get All Fetchs Controller');
        return this.merchantsService.findAll();
    }
    async createMerchant(body, file) {
        this.winstonLoggerService.logInfo('Creating a new merchant');
        console.log(body);
        console.log(file, '-----');
        if (!file) {
            throw new common_1.BadRequestException('Image file is required.');
        }
        const createMerchantDto = { ...body };
        return this.merchantsService.createMerchant(createMerchantDto, file);
    }
    async updateMerchant(id, body, file) {
        this.winstonLoggerService.logInfo(`Updating merchant`);
        const updateMerchantDto = { ...body };
        if (!file) {
            delete updateMerchantDto.image;
        }
        return this.merchantsService.patchMerchant(id, updateMerchantDto, file);
    }
    async delete(id) {
        await this.merchantsService.deleteMerchant(id);
        return { message: 'Merchant deleted successfully' };
    }
};
exports.MerchantsController = MerchantsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "createMerchant", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "updateMerchant", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "delete", null);
exports.MerchantsController = MerchantsController = __decorate([
    (0, common_1.Controller)('merchants'),
    __metadata("design:paramtypes", [merchants_service_1.MerchantsService,
        winston_logger_service_1.WinstonLoggerService])
], MerchantsController);
//# sourceMappingURL=merchants.controller.js.map