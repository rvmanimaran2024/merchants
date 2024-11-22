import { MerchantsService } from './merchants.service';
import { Merchant } from './interfaces/merchant.interface';
import { WinstonLoggerService } from '../winston-logger/winston-logger.service';
export declare class MerchantsController {
    private readonly merchantsService;
    private readonly winstonLoggerService;
    constructor(merchantsService: MerchantsService, winstonLoggerService: WinstonLoggerService);
    findAll(): Promise<Merchant[]>;
    createMerchant(body: any, file: Express.Multer.File): Promise<Merchant>;
    updateMerchant(id: string, body: any, file: Express.Multer.File): Promise<Merchant>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
