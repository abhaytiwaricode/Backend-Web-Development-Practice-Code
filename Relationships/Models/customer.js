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

    // customerSchema.pre('findOneAndDelete', async () => {
    //   console.log('Pre Middleware');
    // });

    customerSchema.post('findOneAndDelete', async (customer) => {
      try {
        if (customer.orders.length) {
          let res = await Order.deleteMany({
            _id: { $in: customer.orders },
          });
          console.log(res);
        }
      } catch (err) {
        console.error(err);
      }
    });

    const Order = mongoose.model('Order', orderSchema);
    const Customer = mongoose.model('Customer', customerSchema);

    const addCust = async () => {
      let newCust = new Customer({
        name: 'Yash Mishra',
      });

      let newOrder = new Order({
        item: 'Burger',
        price: 199,
      });

      newCust.orders.push(newOrder);

      await newOrder.save();
      await newCust.save();

      console.log('added new customer');
    };

    const delCust = async () => {
      let data = await Customer.findByIdAndDelete('65d6f7489ee90b67ac1f36d3');
      console.log(data);
      return data;
    };

    delCust()
      .then((deletedCustomer) => {
        console.log(deletedCustomer);
      })
      .catch((err) => {
        console.error(err);
      });

    mongoose.disconnect();

    // addCust
  } catch (err) {
    console.error('Connection error:', err);
  }
};

addOrders();

// const addCumstomer = async () => {
//   let cust2 = new Customer({
//     name: 'Sandeep Mishra',
//   });

//   let order1 = await Order.findOne({ item: 'Chocolate' });
//   let order2 = await Order.findOne({ item: 'Coke' });

//   if (!order1 || !order2) {
//     console.log('Orders not found');
//     return;
//   }

//   cust2.orders.push(order1);
//   cust2.orders.push(order2);

//   let res = await cust2.save();
//   console.log(res);

// };

// addCumstomer();

// const findCustomer = async () => {
//   let result = await Customer.find().populate('orders');
//   console.log(result[0]);
// };

// findCustomer();
