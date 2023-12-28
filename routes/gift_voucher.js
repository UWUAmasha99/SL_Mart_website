// const express = require('express');
// const router = express.Router();
// const Voucher = require('../model/gift_voucher'); 

// // Create a new voucher
// router.post('/create', async (req, res) => {
//   try {
//     const newVoucher = await Voucher.create(req.body);
//     res.status(201).json(newVoucher);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get all vouchers
// router.get('/list', async (req, res) => {
//   try {
//     const vouchers = await Voucher.find();
//     res.json(vouchers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get a specific voucher
// router.get('/:id', getVoucher, (req, res) => {
//   res.json(res.voucher);
// });

// // Update a voucher
// router.patch('/:id', getVoucher, async (req, res) => {
//   if (req.body.amount != null) {
//     res.voucher.amount = req.body.amount;
//   }
//   if (req.body.recipientName != null) {
//     res.voucher.recipientName = req.body.recipientName;
//   }
//   if (req.body.recipientEmail != null) {
//     res.voucher.recipientEmail = req.body.recipientEmail;
//   }
//   if (req.body.senderName != null) {
//     res.voucher.senderName = req.body.senderName;
//   }
//   if (req.body.senderMessage != null) {
//     res.voucher.senderMessage = req.body.senderMessage;
//   }
//   try {
//     const updatedVoucher = await res.voucher.save();
//     res.json(updatedVoucher);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a voucher
// router.delete('/:id', getVoucher, async (req, res) => {
//   try {
//     await res.voucher.remove();
//     res.json({ message: 'Voucher deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Middleware to get a specific voucher by ID
// async function getVoucher(req, res, next) {
//   try {
//     const voucher = await Voucher.findById(req.params.id);
//     if (voucher == null) {
//       return res.status(404).json({ message: 'Voucher not found' });
//     }
//     res.voucher = voucher;
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// module.exports = router;



//////////////////////////////////

// Create a new voucher
import {
  categoryControlller
} from "./../controllers/categoryController.js";
import express from "express";
import Voucher from "../models/gift_voucher.js"

//const Voucher = require('../models/gift_voucher.js'); 
const router = express.Router();
debugger;
router.post('/create', async (req, res) => {
  try {
    const newVoucher = await Voucher.create(req.body);
    res.status(201).json(newVoucher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } 
});

router.get('/getVouchers', async (req, res) => {
  try {
    const vouchers = await Voucher.find(); 
    res.json(vouchers);
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    res.status(500).json({ error: 'Failed to fetch vouchers' });
  }
});

//get voucher by id


router.get('/getVoucherq', async (req, res) => {
  const { recipientEmail, card_id, status } = req.query;

  try {
    if (!recipientEmail && !card_id && status) {
      return res.status(400).json({ error: 'Recipient email and card_id are required parameters' });
    }

    const voucher = await Voucher.findOne({ recipientEmail, card_id, status });

    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' });
    }

    res.json(voucher);
  } catch (error) {
    console.error('Error fetching voucher:', error);
    res.status(500).json({ error: 'Failed to fetch voucher' });
  }
});

router.put('/revokeVoucher', async (req, res) => {
  const { recipientEmail, card_id } = req.body;

  try {
    if (!recipientEmail || !card_id) {
      return res.status(400).json({ error: 'Recipient email and card_id are required parameters' });
    }

    const voucher = await Voucher.findOneAndUpdate(
      { recipientEmail, card_id, status: 'Issued' },
      { $set: { status: 'Revoked' } },
      { new: true }
    );

    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found or not issued' });
    }

    res.json(voucher);
  } catch (error) {
    console.error('Error revoking voucher:', error);
    res.status(500).json({ error: 'Failed to revoke voucher' });
  }
});

router.get("/get-category", categoryControlller);

export default router;