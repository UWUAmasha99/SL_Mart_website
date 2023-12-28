//const mongoose = require('mongoose');
import mongoose from "mongoose"

const voucherSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  card_id: {
    type: String,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderMessage: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Issued",
  },
});

const Voucher = mongoose.model('Voucher', voucherSchema);

//module.exports = Voucher;
export default Voucher;
