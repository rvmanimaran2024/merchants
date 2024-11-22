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
var MerchantsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs_1 = require("fs");
const path = require("path");
const fs_2 = require("fs");
let MerchantsService = MerchantsService_1 = class MerchantsService {
    constructor(merchantsModel) {
        this.merchantsModel = merchantsModel;
        this.logger = new common_1.Logger(MerchantsService_1.name);
    }
    async findAll() {
        this.logger.log('Fetching all merchants');
        return this.merchantsModel.find().exec();
    }
    async deleteFile(fileName) {
        const imageName = fileName.split('/').pop();
        console.log(imageName);
        const filePath = path.join(__dirname, '..', '../src/uploads', imageName);
        (0, fs_2.unlink)(filePath, (err) => {
            if (err) {
                this.logger.error('Error deleting file:', err);
                throw new Error('File deletion failed');
            }
            this.logger.log('File deleted successfully');
        });
    }
    async saveImage(file, username) {
        const folderPath = path.join(__dirname, '..', '../src/uploads');
        try {
            await fs_1.promises.access(folderPath);
        }
        catch (error) {
            await fs_1.promises.mkdir(folderPath, { recursive: true });
        }
        const imageName = username + '-' + file.originalname;
        const uploadPath = path.join(folderPath, imageName);
        await fs_1.promises.writeFile(uploadPath, file.buffer);
        return `http://localhost:3001/uploads/${imageName}`;
    }
    async createMerchant(createMerchantDto, file) {
        const username = createMerchantDto.username;
        const imageUrl = await this.saveImage(file, username);
        console.log('imageurl   -->', imageUrl);
        const newMerchant = new this.merchantsModel({
            ...createMerchantDto,
            image: { url: imageUrl, altText: file.originalname },
        });
        return newMerchant.save();
    }
    async patchMerchant(id, updateMerchantDto, file) {
        const existingMerchant = await this.merchantsModel.findById(id);
        this.logger.log("inside services  start patch ");
        if (!existingMerchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        if (file) {
            const deleteImage = existingMerchant.image.url;
            await this.deleteFile(deleteImage);
            const username = updateMerchantDto.username;
            const imageUrl = await this.saveImage(file, username);
            updateMerchantDto.image = {
                url: imageUrl,
                altText: file.originalname,
            };
        }
        this.logger.log(Object.assign(existingMerchant, updateMerchantDto));
        this.logger.log("inside services  end patch ");
        return existingMerchant.save();
    }
    async deleteMerchant(id) {
        const deleteDoc = await this.merchantsModel.findByIdAndDelete(id).exec();
        const deleteImage = deleteDoc.image.url;
        await this.deleteFile(deleteImage);
    }
};
exports.MerchantsService = MerchantsService;
exports.MerchantsService = MerchantsService = MerchantsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Merchant')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MerchantsService);
//# sourceMappingURL=merchants.service.js.map