export interface Merchant {
    username: string;
    password: string;
    email: string;
    phone: string;
    website: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    notes?: string;
    type: string;
    categories: string[];
    commission_percentage: number;
    activeFrom: Date;
    image?: {
        url?: string;
        altText?: string;
    };
    isCritical: boolean;
    paymentOptions: {
        cashOnDelivery: boolean;
        upi: boolean;
        card: boolean;
    };
}
