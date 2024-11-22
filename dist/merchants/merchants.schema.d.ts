import { Schema } from 'mongoose';
export declare const MerchantSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    phone: string;
    website: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    type: string;
    categories: string[];
    commission_percentage: number;
    activeFrom: NativeDate;
    isCritical: boolean;
    notes?: string;
    image?: {
        url?: string;
        altText?: string;
    };
    paymentOptions?: {
        cashOnDelivery: boolean;
        upi: boolean;
        card: boolean;
    };
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    phone: string;
    website: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    type: string;
    categories: string[];
    commission_percentage: number;
    activeFrom: NativeDate;
    isCritical: boolean;
    notes?: string;
    image?: {
        url?: string;
        altText?: string;
    };
    paymentOptions?: {
        cashOnDelivery: boolean;
        upi: boolean;
        card: boolean;
    };
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    password: string;
    email: string;
    phone: string;
    website: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    type: string;
    categories: string[];
    commission_percentage: number;
    activeFrom: NativeDate;
    isCritical: boolean;
    notes?: string;
    image?: {
        url?: string;
        altText?: string;
    };
    paymentOptions?: {
        cashOnDelivery: boolean;
        upi: boolean;
        card: boolean;
    };
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
