import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantSchema } from './merchants.schema';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { WinstonLoggerModule } from '../winston-logger/winston-logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Merchant', schema: MerchantSchema }]),
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image (jpg, jpeg, or png).'), false);
        }
        cb(null, true);
      },
    }),
    WinstonLoggerModule
  ],
  controllers: [MerchantsController],
  providers: [MerchantsService],
  exports: [MerchantsService], //
})
export class MerchantsModule {}
 