
// module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  brand: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

  // NEW FIELDS
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex', 'boys', 'girls'],
    required: true
  },
  subCategory: { type: String }, // optional (e.g. "sneakers", "boots")

  variants: [{
    size: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
  }],
}, { timestamps: true });

// Auto-increment productId
productSchema.pre('save', async function (next) {
  if (!this.productId) {
    const lastProduct = await mongoose.model('Product').findOne().sort({ productId: -1 });
    this.productId = lastProduct ? lastProduct.productId + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

