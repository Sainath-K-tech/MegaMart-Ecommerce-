import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  thumbnail: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [orderItemSchema],
  shippingDetails: {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['upi', 'card', 'netbanking']
  },
  paymentStatus: {
    type: String,
    required: true,
    default: 'completed',
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'processing',
    enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled']
  },
  subtotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  shippingCharge: {
    type: Number,
    required: true,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  trackingNumber: {
    type: String,
    default: null
  },
  estimatedDelivery: {
    type: Date,
    default: null
  },
  deliveredAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Generate order ID before saving
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.orderId = `ORD${timestamp}${random}`;
  }
  next();
});

// Generate tracking number when order is shipped
orderSchema.pre('save', function(next) {
  if (this.orderStatus === 'shipped' && !this.trackingNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    this.trackingNumber = `TRK${timestamp}${random}`;
  }
  next();
});

// Set delivered date when order is delivered
orderSchema.pre('save', function(next) {
  if (this.orderStatus === 'delivered' && !this.deliveredAt) {
    this.deliveredAt = new Date();
  }
  next();
});

export default mongoose.model('Order', orderSchema);
