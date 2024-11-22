import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant } from './interfaces/merchant.interface';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { promises as fs } from 'fs';
import { UpdateMerchantDto } from './dto/update-merchant.dto'; 
import * as path from 'path';
import { unlink } from 'fs';

@Injectable()
export class MerchantsService {
  private readonly logger = new Logger(MerchantsService.name);
  constructor(
    @InjectModel('Merchant') 
    private readonly merchantsModel: Model<Merchant>,
   
  ) {}

  async findAll(): Promise<Merchant[]> {
    this.logger.log('File deleted successfully');
    return this.merchantsModel.find().exec();
  }

  async deleteFile(fileName: string): Promise<void> {
    const imageName = fileName.split('/').pop();
    console.log(imageName)
    const filePath = path.join(__dirname, '..', '../src/uploads', imageName);  // Adjust path to your uploads folder

    unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        throw new Error('File deletion failed');
      }
      console.log('File deleted successfully');
    });
  }

  async saveImage(file: Express.Multer.File, username): Promise<string> {
    const folderPath = path.join(__dirname, '..', '../src/uploads');
  
    // Check if the directory exists, and create it if it doesn't
    try {
      await fs.access(folderPath);
    } catch (error) {
      await fs.mkdir(folderPath, { recursive: true });
    }
  
    // Save the file in the uploads folder
    const imageName = username+'-'+file.originalname
    const uploadPath = path.join(folderPath, imageName);
  
    // Save the image buffer to the specified path
    await fs.writeFile(uploadPath, file.buffer);
    
    // Return the URL where the file can be accessed
    return `http://localhost:3001/uploads/${imageName}`;
  }
  
  async createMerchant(createMerchantDto: CreateMerchantDto, file: Express.Multer.File): Promise<Merchant> {
    // Await the URL from the saveImage method
    const username =  createMerchantDto.username
    const imageUrl = await this.saveImage(file, username);
    const newMerchant = new this.merchantsModel({
      ...createMerchantDto,
      image: { url: imageUrl, altText: file.originalname },
    });
    
    return newMerchant.save();
  }

  async patchMerchant(id: string, updateMerchantDto: UpdateMerchantDto, file?: Express.Multer.File): Promise<Merchant> {
    const existingMerchant = await this.merchantsModel.findById(id);
    console.log("inside services  start patch ")

    if (!existingMerchant) {
      throw new NotFoundException('Merchant not found');
    }

    // Handle the new image upload if a file is provided
    if (file) {
      const deleteImage = existingMerchant.image.url;
      await  this.deleteFile(deleteImage)
      const username =  updateMerchantDto.username
      const imageUrl = await this.saveImage(file, username);
      updateMerchantDto.image = {
        url: imageUrl,
        altText: file.originalname,
      };
    }

    console.log(Object.assign(existingMerchant, updateMerchantDto));
    console.log("inside services  end patch ")
    // Save and return the updated merchant document
    return existingMerchant.save();
  }
 
   // Delete a merchant by ID
   async deleteMerchant(id: string): Promise<void> {
    const deleteDoc = await this.merchantsModel.findByIdAndDelete(id).exec();
    const deleteImage = deleteDoc.image.url;
    await  this.deleteFile(deleteImage)
  }
}
