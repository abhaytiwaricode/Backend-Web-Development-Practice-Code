const mongoose = require('mongoose');
const { Schema } = mongoose;

const addOrders = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log('Connected successfully');

    const orderSchema = new Schema({
      item: String,
      price: Number,
    });

    const customerSchema = new Schema({
      name: String,
      orders: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Order',
        },
      ],
    });

    const Order = mongoose.model('Order', orderSchema);
    const Customer = mongoose.model('Customer', customerSchema);

    const addCustomer = async () => {
      let cust2 = new Customer({
        name: 'Sandeep Mishra',
      });

      let order1 = await Order.findOne({ item: 'Chocolate' });
      let order2 = await Order.findOne({ item: 'Coke' });

      if (!order1 || !order2) {
        console.log('Orders not found');
        return;
      }

      cust2.orders.push(order1);
      cust2.orders.push(order2);

      let res = await cust2.save();
      console.log(res);
    };

    await addCustomer();

    const findCustomer = async () => {
      let result = await Customer.find().populate('orders');
      console.log(result[0]);
    };

    await findCustomer();

    let res = await Order.insertMany([
      {
        item: 'Samosa',
        price: 12,
      },
      {
        item: 'Coke',
        price: 20,
      },
      {
        item: 'Chocolate',
        price: 40,
      },
    ]);
    console.log(res);
  } catch (err) {
    console.error('Connection error:', err);
  }
};

addOrders();
