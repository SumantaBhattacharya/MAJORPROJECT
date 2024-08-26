const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log("An error has occurred during forming a connection", err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RELATIONSHIPS');
}

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
}, { timestamps: true });


const postSchema = new mongoose.Schema({
    content: String,
    likes: Number,
    user: {//no array
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }//denormalisation(storing compies/duplicates)
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

const addData = async () => {
    // let user1 = new User({
    //     username: "Jonathan",
    //     email: "Jonathan@example.com"
    // });

    let user =  await User.findOne({email:"Jonathan@example.com"})

    let post2 = new Post({
        content: "This is my second post",
        likes: 1,
        //user: user1 //user1._id
    })
    // post1.user = user1;
    post2.user = user;

    // await user1.save();
    // await post1.save();
    await post2.save();

};

addData();

// const del = async ()=>{
//     await Post.findByIdAndDelete("66c6e270cf856275a1029060")
//     await User.findByIdAndDelete("66c6e270cf856275a1029060")
// }

// del();

const getData = async () => {
    let result = await Post.findOne({}).populate("user","username")
    console.log(result);
    
}

getData();

//case3
/*
https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design

Five: Consider the read-to-write ratio with denormalization. 
A field that will mostly be read and only seldom updated is a good candidate for denormalization. 
If you denormalize a field that is updated frequently then the extra work of finding and updating
all the instances of redundant data is likely to overwhelm the savings that you get from denormalization.
*/
/*
Handling Deletion
using Mongoose Middlewere

We can use 2 middleweres:
* Pre - run before the query is executed
* Post - run after the query is executed

customerSchema.post("findOneAndDelete", async (customer)=>{
    if(customer.orders.length){
    let res = await Order.deleteMany({_id: {$in:customer.orders}})
    console.log(res)
    }});

*/