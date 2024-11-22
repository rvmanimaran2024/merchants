export interface Merchant {
    username: string;                     // Username
    password: string;                     // Password
    email: string;                        // Email
    phone: string;                        // Phone number
    website: string;                      // Website URL
    contact_name: string;                 // Contact person name
    contact_phone: string;                // Contact person phone number
    contact_email: string;                // Contact person email
    notes?: string;                       // Additional notes (optional)
    type: string;                         // Merchant type (e.g., Enterprise)
    categories: string[];                 // List of categories (array of strings)
    commission_percentage: number;        // Commission percentage (integer)
    activeFrom: Date;                     // Date the merchant became active
    image?: {                             // Image object (optional)
      url?: string;                       // Image URL (if any)
      altText?: string;                   // Alternative text for the image
    };
    isCritical: boolean;                  // Whether the merchant is critical (boolean)
    paymentOptions: {                     // Payment options object
      cashOnDelivery: boolean;            // Cash on delivery option
      upi: boolean;                       // UPI option
      card: boolean;                      // Card payment option
    };
  }
  