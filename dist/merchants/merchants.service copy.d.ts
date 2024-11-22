import { Model } from 'mongoose';
import { Merchant } from './interfaces/merchant.interface';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
export declare class MerchantsService {
    private readonly merchantsModel;
    private readonly logger;
    constructor(merchantsModel: Model<Merchant>);
    findAll(): Promise<Merchant[]>;
    deleteFile(fileName: string): Promise<void>;
    saveImage(file: Express.Multer.File, username: any): Promise<string>;
    createMerchant(createMerchantDto: CreateMerchantDto, file: Express.Multer.File): Promise<Merchant>;
    patchMerchant(id: string, updateMerchantDto: UpdateMerchantDto, file?: Express.Multer.File): Promise<Merchant>;
    deleteMerchant(id: string): Promise<void>;
}
