const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log('Connected successfully');

    const userSchema = new Schema({
      username: String,
      addresses: [
        {
          _id: false,
          location: String,
          city: String,
        },
      ],
    });

    const User = mongoose.model('User', userSchema);

    let user1 = new User({
      username: 'abhaytiwari',
      addresses: [
        {
          location: '221B Baker Street',
          city: 'London',
        },
      ],
    });

    user1.addresses.push({ location: 'P36 Wall Street', city: 'London' });
    let result = await user1.save();
    console.log(result);
  } catch (err) {
    console.error('Connection error:', err);
  }
}

main();
