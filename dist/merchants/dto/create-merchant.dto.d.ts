declare class ImageDto {
    url?: string;
    altText?: string;
}
declare class PaymentOptionsDto {
    cashOnDelivery: boolean;
    upi: boolean;
    card: boolean;
}
export declare class CreateMerchantDto {
    username: string;
    password: string;
    email: string;
    phone: string;
    website?: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    notes?: string;
    type: string;
    categories: string[];
    commission_percentage: number;
    activeFrom: Date;
    image?: ImageDto;
    url?: string;
    altText?: string;
    isCritical: boolean;
    paymentOptions: PaymentOptionsDto;
}
export {};
