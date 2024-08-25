const mongoose = require('mongoose');
//case2
main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log("An error has occurred during forming a connection", err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RELATIONSHIPS');
}

const orderSchema = new mongoose.Schema({
    item: String,
    price: Number,
}, { timestamps: true });

/*const addOrders = async () => {


    let order1 = await Order.insertMany([
        {//new -.insertMany
            item: "Laptop",
            price: 10000
        },
        {
            item: "Mobile",
            price: 5000
        },
        {
            item: "Headphones",
            price: 2000
        }
    ]);
    // await Order1.save()
    console.log("Order added successfully", order1)
};

addOrders();*/


const customerSchema = new mongoose.Schema({
    name: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
}, { timestamps: true });

// mongoose.Schema.pre("findOneAndDelete", async()=>{
//     console.log("Pre Middlewere");
// })
customerSchema.pre("findOneAndDelete", async()=>{
    console.log("Pre Middlewere");
})// this query executes before deletion

customerSchema.post("findOneAndDelete", async(deletedCustomer)=>{
    console.log("Post Middlewere");
    console.log(deletedCustomer);

    if(deletedCustomer.orders.length){//deletedCustomer.orders.length > 0
        let res = await Order.deleteMany({_id: {$in: deletedCustomer.orders}});
        console.log("Deleted related orders", res);
    }
    
})//this query executes after deletion

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// const addCustomers = async () => {
//     // Create customer using create() or insertMany()
//     let [customer1] = await Customer.insertMany([
//         { name: "John Doe" }
//     ]);

//     // Find orders
//     let order1 = await Order.findOne({ item: "Laptop" });
//     let order2 = await Order.findOne({ item: "Mobile" });

//     // Push orders to customer's orders array
//     customer1.orders.push(order1._id);
//     customer1.orders.push(order2._id);

//     // Save the updated customer
//     let result = await customer1.save();

//     console.log("Customer added successfully", result);

//     // let res = await Customer.find({});
//     // console.log(res);
    
// }
// addCustomers();

const findCustomersWithOrders = async () => {
    let res = await Customer.find().populate('orders');
    console.log(res[0]);//to res to get object res[0] to get object with details
}

// findCustomersWithOrders();

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

const addCust = async()=>{
    let newCust = new Customer({
        name: "Arjun",
    });

    let newOrder = new Order({
        item: "Fan",
        price: 200
    })

    newCust.orders.push(newOrder)

    await newOrder.save();
    await newCust.save();

    console.log("Another One!");

}


// addCust();

const delCust = async ()=>{
    let deleteCust = await Customer.findByIdAndDelete("66c97e33f37852c6c3740c90");
    console.log(`Deleted Customer:-${deleteCust}`);
    
}

delCust();//https://mongoosejs.com/docs/middleware.html#pre