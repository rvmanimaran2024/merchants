"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MerchantSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    contact_name: { type: String, required: true },
    contact_phone: { type: String, required: true },
    contact_email: { type: String, required: true },
    notes: { type: String },
    type: { type: String, required: true },
    categories: { type: [String], required: true },
    commission_percentage: { type: Number, required: true },
    activeFrom: { type: Date, required: true },
    image: {
        url: { type: String },
        altText: { type: String },
    },
    isCritical: { type: Boolean, required: true },
    paymentOptions: {
        cashOnDelivery: { type: Boolean, required: true },
        upi: { type: Boolean, required: true },
        card: { type: Boolean, required: true },
    },
}, { timestamps: true });
//# sourceMappingURL=merchants.schema.js.map