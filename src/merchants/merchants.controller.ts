import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './interfaces/merchant.interface';
import { WinstonLoggerService } from '../winston-logger/winston-logger.service';  // Import the Winston Logger Service

@Controller('merchants')
export class MerchantsController {
  // Single constructor for both dependencies
  //constructor(private readonly winstonLoggerService: WinstonLoggerService) {}  /
  constructor(
    private readonly merchantsService: MerchantsService,
    private readonly winstonLoggerService: WinstonLoggerService // Inject the Winston logger
  ) {}

  @Get()
  async findAll(): Promise<Merchant[]> {
    this.winstonLoggerService.logInfo('Merchant Get All Fetchs Controller');
    return this.merchantsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))  // File upload handling with Multer
  async createMerchant(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.winstonLoggerService.logInfo('Creating a new merchant');
    
    console.log(body);
    console.log(file, '-----');
    
    if (!file) {
      throw new BadRequestException('Image file is required.');
    }

    const createMerchantDto: CreateMerchantDto = { ...body };



    // Handle the image file and other data in the service
    return this.merchantsService.createMerchant(createMerchantDto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))  // 'image' must match the key from FormData in the frontend
  async updateMerchant(
    @Param('id') id: string,
    @Body() body: any,  // 'Body' is used to receive non-file form data
    @UploadedFile() file: Express.Multer.File,  // 'UploadedFile' is used to receive the file
  ) {
     this.winstonLoggerService.logInfo(`Updating merchant`);

    // Map body data to UpdateMerchantDto
    const updateMerchantDto: UpdateMerchantDto = { ...body };

    if (!file) {
      delete updateMerchantDto.image;
    }

    // Pass 'updateMerchantDto' to the service
    return this.merchantsService.patchMerchant(id, updateMerchantDto, file);
  }

  // Delete a merchant by ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
   // this.logger.info(`Deleting merchant with ID: ${id}`);
    await this.merchantsService.deleteMerchant(id);
    return { message: 'Merchant deleted successfully' };
  }
}
