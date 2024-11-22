import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsNumber, IsDate, IsBoolean, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class ImageDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  altText?: string;
}

class PaymentOptionsDto {
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true)
  cashOnDelivery: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true)
  upi: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true)
  card: boolean;
}


export class CreateMerchantDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsString()
  @IsNotEmpty()
  contact_name: string;

  @IsString()
  @IsNotEmpty()
  contact_phone: string;

  @IsEmail()
  @IsNotEmpty()
  contact_email: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value)) 
  commission_percentage: number;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  activeFrom: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImageDto)
  image?: ImageDto;
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  altText?: string;


  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true' || value === true)
  isCritical: boolean;

  @ValidateNested()
  @Type(() => PaymentOptionsDto)
  @IsNotEmpty()
  paymentOptions: PaymentOptionsDto;
}

