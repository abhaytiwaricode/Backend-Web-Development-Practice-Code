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

    const Order = mongoose.model('order', orderSchema);
    const Customer = mongoose.model('Customer', customerSchema);

    // const addCumstomer = async () => {
    //   let cust1 = new Customer({
    //     name: 'Abhay Tiwari',
    //   });

    //   let order1 = await Order.findOne({ item: 'Samosa' });
    //   let order2 = await Order.findOne({ item: 'Coke' });

    //   if (!order1 || !order2) {
    //     console.log('Orders not found');
    //     return;
    //   }

    //   cust1.orders.push(order1);
    //   cust1.orders.push(order2);

    // let res = await cust1.save();
    // console.log(res);
    
      let result = await Customer.find();
      console.log(result);
    };

    addCumstomer();

    // let res = await Order.insertMany([
    //   {
    //     item: 'Samosa',
    //     price: 12,
    //   },
    //   {
    //     item: 'Coke',
    //     price: 20,
    //   },
    //   {
    //     item: 'Chocolate',
    //     price: 40,
    //   },
    // ]);
    // console.log(res);
  } catch (err) {
    console.error('Connection error:', err);
  }
};

addOrders();
