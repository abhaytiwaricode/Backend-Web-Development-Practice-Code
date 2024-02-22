const mongoose = require('mongoose');
const { Schema } = mongoose;

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log('Connected successfully');

    const userSchema = new Schema({
      username: String,
      email: String,
    });

    const postSchema = new Schema({
      content: String,
      likes: Number,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    });

    const User = mongoose.model('User', userSchema);
    const Post = mongoose.model('Post', postSchema);

    // let user1 = new User({
    //   username: 'abhaytiwari',
    //   email: 'abhay@gmail.com',
    // });

    // await user1.save();

    // let post1 = new Post({
    //   content: 'Hello World',
    //   likes: 1100,
    //   user: user1._id,
    // });

    let user = await User.findOne({ username: 'abhaytiwari' });

    let post2 = new Post({
      content: 'Bye Bye :)',
      likes: 1000,
    });

    post2.user = user;
    await post2.save();
    // await post1.save();

    await mongoose.disconnect();
    console.log('Data added successfully');
  } catch (err) {
    console.error('Connection error:', err);
  }
})();
