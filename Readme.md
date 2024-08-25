# ***Middleware***
## ***It is an intermediary***
```
Request ---------> [Middleware] ---------> Response
```
* *In Express,
Middleware in Express are functions that come into play 
after the server recieves the request and before the 
response is sent to the client*

### ***common Middlewere functions:***
* *methodOverride*

* *bodyParser*

* *express.static*

* *express.urlencoded*

```javascript
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"/public")));
```
#### *HTML FORM-GET | POST*

### *methodOverride brings PUT | DELETE*

1. middleweres can access req and response object
2. under middlewere chaning is possible
3. it even can stop the chaning process by sending a response
```
Request ---------> [Middleware] ---------> Response
        <---------
```
## ***What do middleweres do?***

### ***Middleware functions can perform the following tasks:***
* *Execute any code*
* *Make changes to the request and the response objects*
* *End the request-response cycle.*
* *Call the next middlewere function in the stack*

```javascript
//.Our 1st middleware

//app.use(middleware)

app.use(()=>{
    console.log("Hi, I am a middlewere)
})

app.use((req,res)=>{
    console.log("h1, I am a middleware);
    res.send("bye);
})
```
## ***links i been through***
### ***Useful Links***

- [Mongoose Documentation](https://mongoosejs.com/)
- [Mongoose Guide - Schemas - Virtuals](https://mongoosejs.com/docs/guide.html#schemas-virtuals)
- [Express.js API](https://expressjs.com/en/4x/api.html#app.use)
- [Express.js Middleware Guide](https://expressjs.com/en/guide/using-middleware.html#middleware.application)
- [Express Middleware Libraries](https://blog.bitsrc.io/5-express-middleware-libraries-every-developer-should-know-94e2728f7503?gi=fe90b63c9e8f)
- [Express.js Request API](https://expressjs.com/en/4x/api.html#req.path)
- [Express.js Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Bootstrap Forms Validation](https://getbootstrap.com/docs/5.3/forms/validation/)
- [Joi Schema Validation](https://joi.dev/api/?v=17.13.3)
- [Joi NPM Package](https://www.npmjs.com/package/joi)
- [populate](https://mongoosejs.com/docs/populate.html)
- [population](https://mongoosejs.com/docs/populate.html#population)
- [6-rules-of-thumb-for-mongodb-schema-design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design)
- [middleware](https://mongoosejs.com/docs/middleware.html)
- [types-of-middleware](https://mongoosejs.com/docs/middleware.html#types-of-middleware)
- [pre](https://mongoosejs.com/docs/middleware.html#pre)
- [model](https://mongoosejs.com/docs/api/model.html)
- [findByIdAndDelete](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete())
- [wanderlust](https://github.com/apna-college/wanderlust)
- [express-router](https://expressjs.com/en/4x/api.html#express.router)
- [router](https://expressjs.com/en/4x/api.html#router)
- [cookies in general](https://en.wikipedia.org/wiki/HTTP_cookie)
- [cookies in Express](https://expressjs.com/en/api.html#res.cookie)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)

```javascript
app.use([path,] callback [, callback...])
```
- *Mounts the specified middleware function or functions at the specified path*

*Midllewere ----> 1.response or 2.next(middlewere)*

```javascript
//Using next
//-----------

//The next middleware function is commonly denoted by a variable named next.


app.use((req,res,next)=>{
    console.log('Time:',Date.now())
    next()
})
```
- *If the current middleware function does not end the request-response
cycle, it must call next() to pass control to the next middleware function*

* *middleware will execute even if it doent reaches to its path /abcd*

### *Creating Utility Middleware*

#### *Logger*
```javascript
app.use((req,res,next)=>{
    req.responseTime = new Date(Date.now()).toString();
    console.log(req.method, req.path,req.requestTime,req.hostname);
    next();
})
```
*Callback functions; can be:*

A middleware function.*

*A series of middleware functions (separated by commas).*

*An array of middleware functions.*

*A combination of all of the above.*


###### ***Hopscotch***

* *API TOKEN AS QUERY STRING*

*lets create a middleware for an api that checks if the access token was passed in the query string or not*

```txt
/api --> res => data
/api?token=give access
```
## ***Multiple Middleweres***

- *The default error handler*

*Express comes with a built-in error handler that takes care of any errors that might be encountered in the app.*

*This default error-handling middleware function is added at the end of the middleware function stack.*

- *When an error is written, the following information is added to the response:*

*The res.statusCode is set from err.status (or err.statusCode). If this value is outside the 4xx(400) or 5xx(500) range, it will be set to 500.
The res.statusMessage is set according to the status code.*

*The body will be the HTML of the status code message when in production environment, otherwise will be err.stack.
Any headers specified in an err.headers object.*

#### ***Error Handlers***
* Custom
##### ***Error handling Middleware***
```javascript
app.use((err,req,res,next)=>{
    console.log("----ERROR----");
    next(err);

})// if the status code is not mentioned during an error then 500 status code is automatically set up to the response
```
### ***Writing error handlers***
*Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions*

#### ***Error Class ***

* Custom
```javascript
class ExpressError extends Error{
    contructor(status,message){
        super();
        this.status = status;
        this.message = message;
    }
}
```
### ***HTTP response status codes***
 *HTTP response status codes indicate whether a - specific HTTP request has been successfully completed. Responses are grouped in five classes:*

- Informational responses (100 – 199)
- Successful responses (200 – 299)
- Redirection messages (300 – 399)
- Client error responses (400 – 499)
- Server error responses (500 – 599)

#### ***Error Class***
* *Create an andmin route and send an error with a 403 status code.*
##### ***Mongoose Errors***
- 1. Validation error
- 2. Cast error
```javascript
const handleValidationErr =(err)=>{
    console.log("Validation error occured");
    return err;
}

app.use((err,req,res,next)=>{
    console.log(err.name)
    if(err.name === 'ValidationError'){
        err= handleValidation(err);

    }
    next(err);
})
```
#### ***Form Validations***
-----------------

* *When we enter data in the form, the browser aud/or the web server will check to see that the data is in the correct format and within constraints set by the application*

   * *Client side validation*
   * *Server side validation -db(schema)*

      * **https://joi.dev/api/?v=17.13.3**
      * **https://www.npmjs.com/package/joi**
* *The most powerful schema description language and data validator for JavaScript.*
    * **npm i joi**
      * **server side validation**

# ***Mongo Relationships***


## ***Relationships***
### ***SQL(via Foreign Keys)***

* One to one(1:1)
* one to many(1:n)
* many to many(m:n)

# ***One to one(1:1)***

groom------relationship------bride
### ***Table: Groom***

| id | name | age | bride_id |
|----|------|-----|----------|
| 1  | John | 30  | 1        |

### ***Table: Bride***

| id | name | age |
|----|------|-----|
| 1  | Jane | 28  |


```sql
CREATE TABLE Grooms (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    bride_id INT UNIQUE,
    FOREIGN KEY (bride_id) REFERENCES Brides(id)
);

CREATE TABLE Brides (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);
```


* *Explanation: This is a one-to-one (1:1) relationship where each groom is associated with exactly one bride, and vice versa. The bride_id in the Groom table points to the specific bride in the Bride table that the groom is married to.*

# ***one to many(1:n)***

## ***company----employs------Employees***

Table: Student
### ***Table: Company***

| id | name        | location |
|----|-------------|----------|
| 1  | TechCorp    | New York |
| 2  | HealthPlus  | London   |

### Table: Employee

| id | name    | position | company_id |
|----|---------|----------|------------|
| 1  | Alice   | Engineer | 1          |
| 2  | Bob     | Designer | 1          |
| 3  | Charlie | Doctor   | 2          |
| 4  | David   | Nurse    | 2          |

```sql
CREATE TABLE Company (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100)
);

CREATE TABLE Employee (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(100),
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES Company(id)
);

```


# Many to Many(m:n)

* Actors ---- Acts in ---- Movies

- Table: Author

| id | name       | nationality |
|----|------------|-------------|
| 1  | Jane Doe   | American    |
| 2  | John Smith | British     |


Table: Book
| id | title                   | genre        |
|----|-------------------------|--------------|
| 1  | The Great Adventure     | Fiction      |
| 2  | Science and Reality     | Non-Fiction  |

Table: Author_Book
| author_id | book_id |
|-----------|---------|
| 1         | 1       |
| 2         | 1       |
| 2         | 2       |


Actors can act in many movies.
Movies can have many actors.

```sql
CREATE TABLE Author (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    nationality VARCHAR(100)
);

CREATE TABLE Book (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    genre VARCHAR(100)
);

CREATE TABLE Author_Book (
    author_id INT,
    book_id INT,
    PRIMARY KEY (author_id, book_id),
    FOREIGN KEY (author_id) REFERENCES Author(id),
    FOREIGN KEY (book_id) REFERENCES Book(id)
);

```

- *Cardinality*

### ***Mongo Relationships***

*One to Many / Approach 1(one to few)*

*Store the child document inside parent document*

```javascript

// getting-started.js
const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log("An error has occured during forming a connection", err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RELATIONSHIPS');

}

const userSchema = new mongoose.Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "Sudip",
        addresses: [{
            location: "CCI Colony",
            city: "Bokajan"
        }]
    })
    user1.addresses.push(
        {
            location: "Bidhanagar",
            city: "Kolkata"
        }
    );

    const result = await user1.save();
    console.log(result);
    
}

addUsers();

// module.exports = User;


```

```json
{
   "_id": "ObjectId(\"651d1b11697616419cbf5520\")",
   "username": "sherlock",
   "address": [
       {
           "location": "221B Baker Street",
           "city": "London"
       },
       {
           "location": "P36 DownTown",
           "city": "London"
       }
   ],
   "__v": 1
}

```

## ***One to Many / Approach 2***

*Store a reference to the child document inside parent*

```json
{
    "_id": ObjectId("651d1b11697616419cbf5520"),
    "name": "Anish Rajput",
    "orders": [
        ObjectId("651d1b22687616419cbu6610"),
        ObjectId("651d1b33677616419cbu4430")
    ],
    "__v": 0
}
```

```javascript

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

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

const addCustomers = async () => {
    // Create customer using create() or insertMany()
    let [customer1] = await Customer.insertMany([
        { name: "John Doe" }
    ]);

    // Find orders
    let order1 = await Order.findOne({ item: "Laptop" });
    let order2 = await Order.findOne({ item: "Mobile" });

    // Push orders to customer's orders array
    customer1.orders.push(order1._id);
    customer1.orders.push(order2._id);

    // Save the updated customer
    let result = await customer1.save();

    console.log("Customer added successfully", result);

    // let res = await Customer.find({});
    // console.log(res);
    
}

addCustomers();

```

```json
/** 
* Paste one or more documents here
*/
{
  "name": "John Doe",
  "orders": [
    {
      "$oid": "66c6cfd214e216ccdd84ffa5"
    },
    {
      "$oid": "66c6cfd214e216ccdd84ffa6"
    }
  ],
  "__v": 1,
  "createdAt": {
    "$date": "2024-08-22T06:18:39.440Z"
  },
  "updatedAt": {
    "$date": "2024-08-22T06:18:39.497Z"
  }
}
```
### Population
* *Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).*
* *Populated paths are no longer set to their original _id , their value is replaced with the mongoose document returned from the database by performing a separate query before returning the results.*



```javascript

//https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design

// <100 embed
// >100 array objectId references(dont embed them)
// >1000 parent id store(high cardinality)

// Database denormalization rules of thumb: Your guide through the rainbow
// Here are some “rules of thumb” to guide you through these innumerable (but not infinite) choices:

// One: Favor embedding unless there is a compelling reason not to.

// Two: Needing to access an object on its own is a compelling reason not to embed it.

// Three: Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.

// Four: Don’t be afraid of application-level joins: If you index correctly and use the projection specifier, then application-level joins are barely more expensive than server-side joins in a relational database.

// Five: Consider the read-to-write ratio with denormalization. A field that will mostly be read and only seldom updated is a good candidate for denormalization. If you denormalize a field that is updated frequently then the extra work of finding and updating all the instances of redundant data is likely to overwhelm the savings that you get from denormalization.

// Six: As always with MongoDB, how you model your data depends entirely on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it.

// Handling Deletion
// using Mongoose Middlewere

// We can use 2 middleweres:
// * Pre - run before the query is executed
// * Post - run after the query is executed



customerSchema.post("findOneAndDelete", async (customer)=>{
    if(customer.orders.length){
    let res = await Order.deleteMany({_id: {$in:customer.orders}})
    console.log(res)
    }});

```

### ***Types of Middleware***
- [middleware](https://mongoosejs.com/docs/middleware.html)
- [types-of-middleware](https://mongoosejs.com/docs/middleware.html#types-of-middleware)
#### ***Mongoose has 4 types of middleware:***
* 1.*document middleware*
* 2.*Query middleware*
* *Query middleware is supported for the following Query functions. Query middleware executes when you call exec() or then() on a Query object, or await on a Query object. In query middleware functions, this refers to the query.*
* 3. *Aggregate middleware*

##### 2.***Query middleware***
* findOneAndDelete
* findOneAndReplace
* findOneAndUpdate
* *https://mongoosejs.com/docs/middleware.html#pre*


* *Pre middleware functions are executed one after another, when each middleware calls next.*

- [model](https://mongoosejs.com/docs/api/model.html)
- [findByIdAndDelete](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete())
* *This function(findByIdAndDelete) triggers the following middleware.*
* findOneAndDelete()
```
findByIdAndDelete ---> findOneAndDelete
findByIdAndDelete ---> findOneAndDelete ---> mongoose middlewere(Pre/Post)
```


```javascript
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
    
})

const delCust = async ()=>{
    let deleteCust = await Customer.findByIdAndDelete("66c97e33f37852c6c3740c90");
    console.log(`Deleted Customer:-${deleteCust}`);
    
}

delCust();
```
### ***Deleting Reviws***
- **Mongo operator**
  -  Mongo $pull operator
      * ***$pull***
     * *The $pull operator removes from an existing array all instances of a valaue or values that match a specified condition*

```javascript
//https://expressjs.com/en/4x/api.html#express.router
/*
var router = express.Router([options])
The optional options parameter specifies the behavior of the router.

Property	     Description	           Default	                                                           Availability
caseSensitive	Enable case sensitivity.   Disabled by default, treating “/Foo” and “/foo” as the same.	 
mergeParams	   Preserve the req.params values from the parent router. 
               If the parent and the child have conflicting param names, the child’s value take precedence.	false	4.5.0+
strict	Enable strict routing.	          Disabled by default, “/foo” and “/foo/” are treated the same by the router.	 
*/

const router = express.Router({mergeParams: true});
```
```javascript
// Express Router
// ------------------
// Express Routers area way to organise your Express application such that primary app.js file does not become bloated

const router = express.Router() //creates new router object
//https://expressjs.com/en/4x/api.html#router
/*
A router object is an instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions.
*/

```

## ***Cookies***

* ***Web Cookies***
     * *HTTP/Server cookies are small blocks of data created by a web server while a user is browsing a website and place on the user's computer or other divice by the user's web browser.*

    *A website users cookies to ensure you get the best expirience on the website*

    * *https://en.wikipedia.org/wiki/HTTP_cookie*

       * ***Uses:-***
          * *Session management*
             - *Cookies were originally introduced to provide a way for users to record items they want to purchase as they navigate throughout a website (a virtual shopping cart or shopping basket).Today, however, the contents of a user's shopping cart are usually stored in a database on the server*
         * *Personalization*
         * *Tracking*
           - *See also: Web tracking*
    
 * ***Application ➡ Cookies***
   * *cookies are stored in name value pair*

***How to Send Cookies?***
---
* *in Express*
  * https://expressjs.com/en/api.html#res.cookie
```javascript
app.get("/setcookies",(req,res)=>{
    //           name    value
    res.cookie("greet","namate")
    res.cookie("origin","India")
    res.send("We send you  a cookie!")
});
//https://expressjs.com/en/api.html#res.cookie
```

## ***Cookie Parser***
### ***cookie-parser-package***
* *https://www.npmjs.com/package/cookie-parser*
```javascript

// https://www.npmjs.com/package/cookie-parser

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/getcookies",(req,res)=>{
    console.dir(req.cookies);
    res.send("got the cookies");
})

```
```javascript

app.get("/getcookies",(req,res)=>{
    let {name="anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
})

```


