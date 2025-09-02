import express from 'express';
import Order from '../models/Order.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Create a new order - DISABLED (orders are not saved after payment)
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     console.log('Order creation request received:', {
//       userId: req.user.id,
//       body: req.body
//     });

//     const {
//       items,
//       shippingDetails,
//       paymentMethod,
//       subtotal,
//       discount,
//       shippingCharge,
//       totalAmount
//     } = req.body;

//     const order = new Order({
//       userId: req.user.id,
//       items: items.map(item => ({
//         productId: item.id, // This is the MongoDB ObjectId from the product
//         title: item.title,
//         price: item.price,
//         quantity: item.qty,
//         thumbnail: item.thumbnail
//       })),
//       shippingDetails,
//       paymentMethod,
//       subtotal,
//       discount,
//       shippingCharge,
//       totalAmount
//     });

//     console.log('Attempting to save order:', order);
//     await order.save();
//     console.log('Order saved successfully:', order.orderId);

//     res.status(201).json({
//       success: true,
//       message: 'Order created successfully',
//       order: {
//         id: order._id,
//         orderId: order.orderId,
//         items: order.items,
//         shippingDetails: order.shippingDetails,
//         paymentMethod: order.paymentMethod,
//         orderStatus: order.orderStatus,
//         totalAmount: order.totalAmount,
//         createdAt: order.createdAt
//       }
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     console.error('Error details:', {
//       message: error.message,
//       name: error.name,
//       stack: error.stack
//     });
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create order',
//       error: error.message
//     });
//   }
// });

// Get all orders for the authenticated user
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name description');

    const formattedOrders = orders.map(order => ({
      id: order._id,
      orderId: order.orderId,
      date: order.createdAt.toISOString().split('T')[0],
      status: order.orderStatus,
      total: order.totalAmount,
      items: order.items.map(item => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.thumbnail
      })),
      tracking: order.trackingNumber,
      deliveryDate: order.deliveredAt ? order.deliveredAt.toISOString().split('T')[0] : null,
      estimatedDelivery: order.estimatedDelivery ? order.estimatedDelivery.toISOString().split('T')[0] : null,
      shippingDetails: order.shippingDetails,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      discount: order.discount,
      shippingCharge: order.shippingCharge
    }));

    res.json({
      success: true,
      orders: formattedOrders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Get a specific order by ID
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderId: req.params.orderId, 
      userId: req.user.id 
    }).populate('items.productId', 'name description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const formattedOrder = {
      id: order._id,
      orderId: order.orderId,
      date: order.createdAt.toISOString().split('T')[0],
      status: order.orderStatus,
      total: order.totalAmount,
      items: order.items.map(item => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.thumbnail
      })),
      tracking: order.trackingNumber,
      deliveryDate: order.deliveredAt ? order.deliveredAt.toISOString().split('T')[0] : null,
      estimatedDelivery: order.estimatedDelivery ? order.estimatedDelivery.toISOString().split('T')[0] : null,
      shippingDetails: order.shippingDetails,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      discount: order.discount,
      shippingCharge: order.shippingCharge,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };

    res.json({
      success: true,
      order: formattedOrder
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// Delete an order (soft delete - mark as cancelled)
router.delete('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderId: req.params.orderId, 
      userId: req.user.id 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Only allow cancellation if order is not shipped or delivered
    if (['shipped', 'delivered'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order that has been shipped or delivered'
      });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: error.message
    });
  }
});

// Admin: Get all orders (for admin dashboard)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .populate('items.productId', 'name description');

    const formattedOrders = orders.map(order => ({
      id: order._id,
      orderId: order.orderId,
      userId: order.userId._id,
      userName: order.userId.name,
      userEmail: order.userId.email,
      date: order.createdAt.toISOString().split('T')[0],
      status: order.orderStatus,
      total: order.totalAmount,
      items: order.items,
      tracking: order.trackingNumber,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      shippingDetails: order.shippingDetails,
      createdAt: order.createdAt
    }));

    res.json({
      success: true,
      orders: formattedOrders
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Admin: Update order status
router.put('/admin/:orderId/status', verifyToken, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { orderStatus, estimatedDelivery } = req.body;

    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = orderStatus;
    if (estimatedDelivery) {
      order.estimatedDelivery = new Date(estimatedDelivery);
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        orderId: order.orderId,
        orderStatus: order.orderStatus,
        estimatedDelivery: order.estimatedDelivery
      }
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

export default router;
