const express = require('express');
const Order = require('../models/order.model');

const orderRouter = express.Router();

// Place a new order
orderRouter.post('/api/orders', async (req, res) => {
  try {
    const { user, restaurant, items, totalPrice, deliveryAddress, status } = req.body;
    const order = await Order.create({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});


orderRouter.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user')
      .populate('restaurant');
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update the status 
orderRouter.patch('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports =  
 orderRouter;

   

