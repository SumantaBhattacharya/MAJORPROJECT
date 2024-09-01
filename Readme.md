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
    console.log("Hi, I am a middlewere")
})

app.use((req,res)=>{
    console.log("h1, I am a middleware");
    res.send("bye");
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
- [**MDN HTTP Status Codes**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
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
- [express-session](https://www.npmjs.com/package/express-session)
- [session-stores](https://www.npmjs.com/package/express-session#compatible-session-stores)
- [flash](https://www.npmjs.com/package/connect-flash)
- [expressjs](https://expressjs.com/)
- [api.html](https://expressjs.com/en/api.html)
- [res](https://expressjs.com/en/4x/api.html#res)
- [res.locals](https://expressjs.com/en/api.html#res.locals)
- [passportjs](https://www.passportjs.org/)
- [passport-strategies](https://www.passportjs.org/packages/)
- [passport-local](https://www.passportjs.org/packages/passport-local/)
- [Passport-npm](https://www.npmjs.com/package/passport)
- [passport-local-npm](https://www.npmjs.com/package/passport-local)
- [Login after SignUp](https://www.passportjs.org/concepts/authentication/login/)
- [router.route](https://expressjs.com/en/4x/api.html#router.route)
* [***Starability***](https://github.com/LunarLogic/starability)
* [*Starability-*](https://lunarlogic.github.io/starability/)
* [***Starability-css***](https://github.com/LunarLogic/starability/tree/master/starability-css)
- [multer](https://www.npmjs.com/package/multer)
- [cloudinary.com](https://console.cloudinary.com/)
- [cloudinary-npm](https://www.npmjs.com/package/cloudinary)
- [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)

# Project Setup

To set up the project, you need to install the required dependencies and devDependencies. Use the following commands:

## Installing Dependencies

```bash
npm i dotenv ejs ejs-mate express joi method-override mongoose multer
npm i cookie-parser
npm i express-session
npm i connect-flash
npm i passport passport-local passport-local-mongoose
npm i multer
npm i dotenv
npm i cloudinary multer-storage-cloudinary
```
### Installing DevDependencies
--- 

```bash
npm i -D prettier
```

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
```javascript

//https://expressjs.com/en/4x/api.html#req.cookies

// When using cookie-parser middleware, this property is an object that contains cookies sent by the request. 
// Cookie: name=tj
console.dir(req.cookies.name)//req.cookies undefined without cookie-parser
// => 'tj'

// npm i cookie-parser
// npm i cookie-parser
```

* *https://expressjs.com/en/4x/api.html#req.cookies*

```bash
  npm i cookie-parser
```
```javascript
 const cookieParser = require("cookie-parser")

 //middlewere
 app.use(cookieParser());

 //cookies noting but a piece of information which we can send with response and get/parse using cookie-parser

```

# ***Signeed Cookies***

### **Send** ***Signed Cookie***
- [cookies in Express](https://expressjs.com/en/api.html#res.cookie)
```javascript

// https://expressjs.com/en/api.html#res.cookie

// To protect our cookies fro  unintentional tempering
// property type     Description
// signed   boolean  Indicates if the cookie should be signed

app.use(cookieParser("secretcode"))// data encode(un-readable)

app.get("/getssignedcookie",(req,res)=>{
    res.cookie("color","red",{signed:true});
    res.send("done!")
})

```

### **Verify** ***Signed Cookie***

```javascript
app.get("/verify",(req,res)=>{
    // req.cookies is to print unsigned cookies

    console.log(req.cookies)// undefined beause its is a signed cookie express differenciates between normal(unsigned) cookies and signed cookies

    // to print signed cookies we use req.signedCookies
    res.send(req.signedCookies);// if the user tries to temper with the cookies then we will get an empty object
    // and if we just temper with the value then its will show the name but the value will be false
});
```

## ***What is State***

* ***The rules followed by req(request) and res(response) we call it protocol***

### ***Stateful Protocol***
* ***Stateful protocol require server to save the status and session information.***
   * ***ef- ftp(File Transfer Protocol)***

### ***Stateless Protocol***

* ***Stateless Protocol does not require the server to retain the server information***
  * ***eg - http***

***Browser(Client) --- Node(server)***

**cookie** --- **session**  

## ***Express Session***
* ***An attempt to make our session stateful.***
 *(because bt default http is of stateless nature)*

  ***basically express session saves the stateful information of users and creates a id for that session***

```
Server(Node) Client(Browser)
session       cookie
  (101)     ↪  [101] stores in the form of a cookie
  {
    item:laptop,
    item: charger
  }

  for example: In a E-commerce website an user stores some of the items in the card section if the the user move to the next page, the items will still be there by the session thats why we need to explicitly save the session(information) We stores our temporary informations in the sessions and Database is used for storing parmanent information

```

#### session(options)
* ***creates a session middlewere with the given options***
  * ***npm i express-session***

```javascript

const session = require("express-session")// every request get,post,put and delete has now associated with a a session id name connect.sid value would be a random set of characters in the form of a cookie

// Observation

// this session is saved in every single page of the website in the same browser the data will not be changed irrespective of browser (Safari) inspect-elements -> Storage
// the session value is going to be different in different browser

// using npm package

// Server(Node) Client(Browser)
// session      cookie

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.get("/reqcount",(req,res)=>{
    // req.session.count = 1;
    if(req.session.count){
        req.session.count++
    }else{
        req.session.count = 1;
    }
    res.send(`You send a request to ${req.session.count} times`)// the value of count will be save even on different browser it is saved under a single session
});// the tracking is done by express-session middlewere

/*
Options
express-session accepts these properties in the options object.
- cookie
- cookie.domain
- cookie.expires
- cookie.httpOnly
- secret
- resave
Required option
This is the secret used to sign the session ID cookie. 
This can be either a single secret, or an array of multiple secrets.
The secret itself should be not easily parsed by a human and would best be a random set of characters.
Periodic updates of the secret, while ensuring the previous secret is in the array.

- MemoryStore
     - Warning The default server-side session storage, MemoryStore, is purposely not designed for a production environment. 
https://www.npmjs.com/package/express-session#compatible-session-stores

- resave (memory/session store) without the the terminal will give warning about deprecation
    - Forces the session to be saved back to the session store, even if the session was never modified during the request. 

    - by default we set it to false

-  saveUninitialized without the the terminal will give warning about deprecation
saveUninitialized
    -Forces a session that is "uninitialized" to be saved to the store. 
    - by default we set it to true

*/
```

```javascript
// Storing & Using Info
    
const express = require("express")
const session = require("express-session")

const app = express()

// middleware

const sessionOptions = {
    secret: "my secret key",
    resave: false,//resave: true,
    saveUninitialized: true
}

app.use(session(sessionOptions));

app.get("/register", (req, res) => {
    // req.session.name = req.query.name
    let { name="anonymous" } = req.query; // Access the 'name' query parameter

    console.log(req.session);//object - Session {cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }}

    req.session.name = name; // Store the name in the session
    console.log(req.session.name);//sumanta

    res.send(`Register Page: ${name}`);
});//http://localhost:8000/register?name=sumanta

app.get("/hello", (req, res) => {
    res.send(`Hello, ${req.session.name}`);
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { // middleware
    console.log(`Server running at http://localhost:${PORT}`);
});

```

# ***Connect-flash***
* ***The flash is special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.***

* *The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.*

* ***Usage***

  * ***Flash messages are stored in the session. First, setup sessions as usual by enabling cookieParser and session middleware. Then, use flash middleware provided by connect-flash.***

```bash
  npm i cookie-parser
  npm i express-session
  npm i connect-flash
  ```

  ```javascript
const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

const app = express()

// middleware

app.use(cookieParser());

const sessionOptions = {
    secret: "my secret key",
    resave: false,//resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}

app.use(session(sessionOptions));
app.use(flash());
/*sessionOptions, the secure flag is set to true. This means the cookie will only be sent over HTTPS connections. For local development over HTTP, you should set this to false.*/
```

* ***install connect-flash***
  * *https://www.npmjs.com/package/connect-flash*
  * *Flash messages*

 ```bash
npm i connect-flash
```

```javascript
const flash = require("connect-flash")
```

```javascript
import flash from "flash"
```

```javascript
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();

// Middleware setup
app.use(cookieParser('keyboard cat'));

const sessionOptions = {
    secret: "my secret key",
    resave: false, // Doesn't save the session if it wasn't modified
    saveUninitialized: true, // Saves a new session even if it hasn't been modified
    cookie: { 
        secure: false, // Set to false for local development (HTTP); true for production (HTTPS)
        maxAge: 60000 // 1 minute
    }
};

app.use(session(sessionOptions));
app.use(flash());

/*
app.configure(function() {
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session(sessionOptions,{ cookie: { maxAge: 60000 }}));
  app.use(flash());
});
*/
```

```javascript
// practical example-1
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const path = require("path")

const app = express();

// Middleware setup
app.use(cookieParser('keyboard cat'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const sessionOptions = {
    secret: "my secret key",
    resave: false, // Doesn't save the session if it wasn't modified
    saveUninitialized: true, // Saves a new session even if it hasn't been modified
    cookie: { 
        secure: false, // Set to false for local development (HTTP); true for production (HTTPS)
        maxAge: 60000 // 1 minute
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/", (req, res) => {
    res.send("Hey!")
})

app.get("/register", (req, res) => {
    // req.session.name = req.query.name
    let { name="anonymous" } = req.query; // Access the 'name' query parameter

    console.log(req.session);//object - Session {cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }}

    req.session.name = name; // Store the name in the session
    console.log(req.session.name);//sumanta

    // Set a flash message by passing the key, followed by the value, to req.flash().
    //         key          message
    req.flash('success', 'user registered successfully!')

    res.send(`Register Page: ${name}`);
});//http://localhost:8000/register?name=sumanta

app.get("/hello", (req, res) => {
    // res.send(`Hello, ${req.session.name}`);
    //console.log(req.flash("success"));//flash message is being cleared after it is accessed once.

    // const successMessage = req.flash("success");
    // res.render("index.ejs", { name: req.session.name, msg: successMessage });
    
    res.render("index.ejs",{name: req.session.name, msg: req.flash("success")})
});//http://localhost:8000/login?name=sumanta

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { // middleware
    console.log(`Server running at http://localhost:${PORT}`);
});

```
```javascript
// res.local
// ---------

app.use((req,res,next)=>{
    res.locals.messages = req.flash("success");
    next();
})
```

- [res.locals](https://expressjs.com/en/api.html#res.locals)

```javascript
// Use this property to set variables accessible in templates rendered with res.render.
app.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  res.locals.user = req.user
  res.locals.authenticated = !req.user.anonymous
  next()
})
```

## ***Cookie in SessionOptions***
* ***Using Sessions***
```javascript
const sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialised: true,
    cookie:{
        expire: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
    }
}
/*
cookie
Settings object for the session ID cookie. The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.
cookie.expires
Specifies the Date object to be the value for the Expires Set-Cookie attribute. By default, no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.
*/
```

 # ***Authencation  v/s Authorization***
 ### **Authencation**
 * *Authencation is a process of verifying who someone is.*
    * *sign in/log in*
 ### **Authorization**
 * *Authorization is  a process of verifying what specific applications, files, and data a user has access to.*
   * *access to pages,edit,delete*

## ***Storing Passwords***
*We* **NEVER** *store the passwords as it is. We store their hashed form*. 
```
password      [ Hashing  ]   how it is stored
"hellowordl"  [ Function ]  "Unreadable string"
```

## ***Hashing***

* ***1.*** *For every input, there is a fixed length output*

* ***2*** *They are one-way functions, we can get input from output*
  * *(input ➡ output) ***✔*** (output ➡ input) ***✖****
  * ***eg*** **-** *modulus of function*
    * *Modulus in JS in called Absolute*
      * *Math.abs(-5) //output- 5*
        * *(input ➡ output)* ***✔***
            * ***X % 3 = 0***
            * ***3 % 3 = 0***
            * ***6 % 3 = 0***
            * ***9 % 3 = 0***
            * ***12 % 3 = 0***

        `This way from output we can never guess the input`
      * *Math.abs(5) //output- 5*
        * *(output ➡ input) ***✖****


* **3.** *For a different input, there is a different output but of same length*

* **4.** *Small changes in input should bring large changes in output*
```
 SHA256
 MD5
 CRC
 Bcrypt
```

`SHA256 is a weak algorithm`

## ***Salting***

***Password salting is a technique to protect passwords stored in databases by adding  a string of 32 or more characters and then hashing them***

```
salt="%?@
abc ➡ abc%?@ - hashed form
```
`salting basically adds extra letters to the random collection of string`

###### ***reverse lookup table***
* *is a hacking technique*

`In this project is we using Passport instad of using bcrypt`

## ***Passport***
`Required packages to work with Passport`

```bash
# https://www.passportjs.org/
# https://www.passportjs.org/packages/
# https://www.passportjs.org/packages/passport-local/

# https://www.passportjs.org/
# Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

 npm i passport
 npm i passport-local
 npm i passport-local-mongoose
 npm i passport passport-local passport-local-mongoose
```

## [Passport](https://www.npmjs.com/package/passport)
`Passport is Express-compatible authentication middleware for Node.js.`
```bash
npm i passport
```
```javascript
const passport = require("passport")
```

## Strategy
| Strategy | Protocol    |
|----------|-------------|
| Local    | HTML form   |

## [passport-local](https://www.npmjs.com/package/passport-local)
`Passport strategy for authenticating with a username and password.`
```bash
npm i passport-local
```
```javascript
const localStrategy = require("passport-local");
```

## [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)
`Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.`
```bash
npm i passport-local-mongoose
```

# User Model
**user :** *username,password,email*

```
Your're free to define your User how you like. Passport-Local-Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

Additionally, Passport-local Mongoose adds some methods to your Schema. 
```

```javascript
const passportLocalMongoose = require('passport-local-mongoose');
```

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

/*
const passportLocalMongoose = require('passport-local-mongoose');
*/

```

## **Configuring Strategy**
<!-- ------------------- -->
`passport.initialize()`
A middlewere that initializes passport.
`passport.session()`
```
A web application needs to ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is know as a a session
```

```javascript
const passport = require("passport")
const localStrategy = require("passport-local");
```
---

```javascript
const localStrategy = require("passport-local");
```
`
This imports the entire passport-local module and assigns it to the variable localStrategy.
You would then need to access the Strategy class via localStrategy.Strategy.
`
---
```javascript
const LocalStrategy = require("passport-local").Strategy;
```
`
This directly imports only the Strategy class from the passport-local module and assigns it to the variable LocalStrategy.
You can use [LocalStrategy] directly without needing to reference [localStrategy.Strategy].
`
---
# For using Passport authentication 
```javascript
// to use password there is a require to use express-session that why we are implementing it after app.use(session({}))
app.use(passport.initialize())
app.use(passport.session())//A web application needs to ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is know as a a session
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/*
authenticate() Generates a function that is used in Passport's LocalStrategy
serializeUser() Generates a function that is used by Passport to serialize users into the session
deserializeUser() Generates a function that is used by Passport to deserialize users into the session
 */
```

# ***Demo User***
```javascript
app.get("/demouser",async(req,res)=>{
    let newUser = new User({
        email: "sumanta2004@gmail.com",
        username: "sumanta bhattacharya",//automatically adds by passport-mongoose
        // password: "password123"
    });//pbkdf2 hashing algorithm
    
    let regUser = await User.register(newUser,"password123");
    res.send(regUser)

})//register(user, password, cb) Convenience method to register a new user instance with a given password. Checks if username is unique. 
```

## Signup User
`GET /signup  ---> signup form`    
**POST /signup     ↩** 

```javascript
app.get("/signup", (req, res) => {
    res.render("users/signup")
})

app.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({
            email: email,
            username: username,//automatically adds by passport-mongoose
            // password: "password123"
        });
        let regUser = await User.register(newUser, password);
        console.log(regUser);

        if (!regUser) {
            req.flash("error", "you're sign up failed, try again!")
            res.redirect(`/signup`);
        }
        req.flash('success', "You're sign up is now comepleted!");

        res.redirect(`/listing-users`);
    } catch (error) {
        req.flash("error", `You're already registered: ${error.message}`)
        res.redirect(`/signup`);
    }

}));

```

## Login User
`GET /login  ---> login form`    
**POST /login     ↩** 

## ***Authenticate Requests***
* ***Passport provides an authenticate() function, which is used as route middleware to authenticate requests.***
```javascript
app.post("/login",(req,post)=>{
    passport.authenticate("local", {
        successRedirect: "/listing-users",
        failureRedirect: "/login",
        failureFlash: true
    })
})
```
---
* ***The*** `passport.authenticate("local", ...)` ***can be called directly as middleware and  inside the async function. Here's a breakdown:***

1. **First Way (Middleware):**
   ```javascript
   app.post("/login", passport.authenticate("local", {
       successRedirect: "/listing-users",
       failureRedirect: "/login",
       failureFlash: true
   }));
   ```
   - This approach directly uses `passport.authenticate` as middleware for the `/login` route.
   - It handles everything related to authentication: checking credentials, redirecting based on success or failure, and flashing messages.

2. **Second Way (Inside Async Function):**
   ```javascript
   app.post("/login", async(req, post) => {
       passport.authenticate("local", {
           successRedirect: "/listing-users",
           failureRedirect: "/login",
           failureFlash: true
       })(req, post);
   });
   ```
   - This approach wraps `passport.authenticate` inside an async function.
   - This method is useful if you need to do additional processing before or after authentication.

```html
<% layout("/layouts/boilerplate") %>

<div class="row mt-3">
    <div class="col-8 offset-2">
        <h2 style="font-family: 'Poppins', sans-serif; color: white; border: 2px solid black; border-radius: 20px; text-align: center; padding: 1vw; background-color: brown;"><b>Login</b> to Wanderlust platform</h2>
        <hr>
        <form action="/login" method="post" novalidate class="needs-validation">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" required style="font-family: 'Poppins', sans-serif;">
                <div class="valid-feedback">
                    Looks good!
                </div>
                <div class="invalid-feedback">
                    Please provide your username.
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required minlength="6" style="font-family: 'Poppins', sans-serif;">
                <div class="valid-feedback">
                    Password looks good!
                </div>
                <div class="invalid-feedback">
                    Please provide your password.
                </div>
            </div>
            <button type="submit" class="btn btn-primary" style="font-family: 'Poppins', sans-serif;">Login</button>
        </form>
    </div>
</div>

```

Since both methods are included in your code, the second one is redundant unless you need to perform extra actions inside the async function. You can safely remove the async function if you don't need it.

## ***Connectiong login Route***
***How to check if the User is Logged in?***
```javascript
req.isAuthenticate() // Passport method
```
```javascript
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();//serialize store the user information
    }
    res.redirect("/login");
}
```
## **Login after SignUp**
* **Passport's login method automatically establishes a login session.**
* **We can invoke login to automatically login a user**
- [***Login after SignUp***](https://www.passportjs.org/concepts/authentication/login/)

```javascript
req.login(registeredUser,(err)=>{
    if(err){
        next(err)
    }
    req.flash("success","Welcome to wandurlust!")
    res.redirect("/listings")
})
// https://www.passportjs.org/concepts/authentication/login/
// When the login operation completes, user will be assigned to req.user.
// Note: passport.authenticate() middleware invokes req.login() automatically. This function is primarily used when users sign up, during which req.login() can be invoked to automatically log in the newly registered user.

/*
https://www.passportjs.org/concepts/authentication/logout/
Passport exposes a logout() function on req (also aliased as logOut()) that can be called from any route handler which needs to terminate a login session. Invoking logout() will remove the req.user property and clear the login session (if any).
*/
```

## **Listing Owner**
* An owner of the listing or review will only authorised to delete the significant listing/review
```javascript
function isLoggedIn(req, res, next) {
    // console.log(req.user);
    // console.log(req);
    // console.log(req.path);
    //           relative        complete url
    //console.log(req.path, "..", req.originalUrl);///listings/66cc8bff19979e076540ebd9/edit .. /listings/66cc8bff19979e076540ebd9/edit

    // if (req.isAuthenticated()) {//req.user
    //   return next();
    // }
    // req.flash("error","Before that, Please log in!")
    // res.redirect("/login");

    if (!req.isAuthenticated()) {
        // redirectUrl save
        // Save the URL the user was trying to access
        req.session.redirectUrl = req.originalUrl;// when the user pressing the edit listing/reviw button or add review/listing then the user is redirect to the login page and then after he/she logged in then the user is rediorecting to the home page when the user is trying to acces to supposedly add or edit page for removing this inconvinience we are adding up to this line
        // path(edit/create)➡login✅➡path ✔ | path(edit/create)➡login✅➡ home
        // req.session.returnTo = req.originalUrl;
        req.flash("error", "plase consider log in")
        return res.redirect("/login");;
    }
    next();

}// module.exports.isloggedin=(req,res,next)=>{})


function saveRedirectUrl(req, res, next) {
    if (req.session.redirectUrl) {// passing the url path like /edit to redirecUrl
        res.locals.redirectUrl = req.session.redirectUrl;//res.locals is an object that contains response-local variables scoped to the request. These variables are available to the view templates rendered during that request/response cycle.
    }
    next();
}

app.post("/login", saveRedirectUrl, passport.authenticate("local", {
    // successRedirect: "/listing-users",✔
    // successRedirect: req.session.redirectUrl,✖
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {// then the it is directing to the redirectling url 
    req.flash('success', 'Welcome to Wandurlust!');//not require because we redirecting using success
    //res.redirect(req.session.redirectUrl)//(we cannot pass it directly so we are using locals methods) bydefault session gets delted by the passport(empty undefined value) thats wht we use locals
    
    // res.redirect(res.locals.redirectUrl);
    const redirectUrl = res.locals.redirectUrl || "/listing-users"; // Use the saved URL or default to "/listing-users" | || "/listing-users" we are using this because suppose if the user directly logins from the home page then the path will be empty thats why we are redirecting the user to the home route menually so thats why we are not direcly redirecting - res.redirect(res.locals.redirectUrl);
    delete req.session.redirectUrl; // Clear the redirectUrl from the session 
    res.redirect(redirectUrl);
    // console.log("Redirect URL:", res.locals.redirectUrl);

    /*
    async (req, res) => {
    try {
        req.flash('success', 'Welcome to Wandurlust!');
        res.redirect(res.locals.redirectUrl || "/listing-users");
    } catch (error) {
        console.error("Login error:", error);
        res.redirect("/login");
    }
     */

})
```

## **Starting with Authorization**
* now our next work is to hide the edit and delete from from the unlogin user
  * 1) listing owner(listing.owner._id)
  * 2) edit/delete user(req.user)

`if the listing.owner._id === req.user then show the edit and delete button otherwise not`

```html
                    <% if(currUser && currUser._id.equals(listing.owner._id)){%>
            <!--authorisation first of all the cuurent user should exists like after login then check if its equals to the owner of the listing -->
                        <div class="card-footer d-flex justify-content-between">
                            <a href="/listings/<%= listing._id %>/edit" class="btn btn-primary">Edit this listing</a>
                            <form action="/listings/<%= listing._id %>?_method=DELETE" method="post">
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    <% }%>
```

## ***Setting Authorisation***
`For Reviews`
```
1. Review ➡ owner/author will only ave the access to delete or update the review or listing
First we need to make some additional changes to our review schema
```

2. Show author details
```javascript
    const user = await Listing.findById(id).populate(
        {path:"reviews", populate:{
        path: "author"
    }}).populate("owner") ;//reviews-objectId | for everry single review we have to populate the author so we can get the username 
    
```
```html
<% if(currUser){%>
            <!-- if the current user logged in the the review page will only show to him -->
            <div style="margin-bottom: 2vw;" class="col-md-8 offset-md-2">
                <h4 class="text-center mb-4">Please provide a review</h4>
                <form action="/listings/<%= listing._id %>/reviews" method="post" novalidate class="needs-validation">
                    <div class="form-group mb-3">
                        <label for="rating" class="form-label">Your Rating:</label>
                        <input type="range" min="1" max="5" id="rating" name="review[rating]" class="form-range">
                    </div>
                    <div class="form-group mb-3">
                        <label for="comment" class="form-label">Comments</label>
                        <textarea name="review[comment]" id="comment" cols="30" rows="5" class="form-control"
                            style="resize: none;" required></textarea>
                        <div class="invalid-feedback">Please select a valid comment.</div>
                        <div class="valid-feedback">A valid comment</div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </form>
            </div>
            <% }%>
```

3. 
```
    <p class="m-0 ms-3">
        <%= review.author.username %>
    </p>
```
```javascript
async function isAuthor(req,res,next) {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You're not the author of this review")
        return res.redirect(`/listings/${id}`);// if we dont return the rest of the code will get peformed
        
    }
    next()
}
app.delete("/listings/:id/reviews/:reviewId", isLoggedIn,isAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }, { new: true });
    if (!listing) {
        throw new ApiError(404, "Listing not found!");}
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'A review deleted successfully!');
    res.redirect(`/listings/${id}`);
}));
```

<!--      Database Front-end Back-end -->
# ***MVC: Model,View,Controller***
`Framework`
`It( Design Pattern) is a way of writting code`
* ***Implement Design Pattern for Listings***
---
# [Router.Route](https://expressjs.com/en/4x/api.html#router.route)
### ***router.route(path)***
***Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware. Use router.route() to avoid duplicate route naming and thus typing errors.***

* [***Starability***](https://github.com/LunarLogic/starability)
* [*Starability-*](https://lunarlogic.github.io/starability/)
* [***Starability-css***](https://github.com/LunarLogic/starability/tree/master/starability-css)
```
How to use
Showing the static rating result
```
```css
/* https://github.com/LunarLogic/starability
https://lunarlogic.github.io/starability/
https://github.com/LunarLogic/starability/tree/master/starability-css
 */
.starability-result {
    position: relative;
    width: 150px;
    height: 30px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");
    font-size: 0.1em;
    color: transparent;
  }
  
  .starability-result:after {
    content: ' ';
    position: absolute;
    left: 0;
    height: 30px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");
    background-position: 0 -30px;
  }
  
  .starability-result[data-rating="5"]::after {
    width: 150px;
  }
  
  .starability-result[data-rating="4"]::after {
    width: 120px;
  }
  
  .starability-result[data-rating="3"]::after {
    width: 90px;
  }
  
  .starability-result[data-rating="2"]::after {
    width: 60px;
  }
  
  .starability-result[data-rating="1"]::after {
    width: 30px;
  }
  
  @media screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi) {
    .starability-result {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAB4CAMAAACZ62E6AAABAlBMVEUAAACZmZmampr2vSObm5v/yiufn5+ampr1viP1viSZmZn2viOZmZmampqampr2viSampqampqcnJz5vyScnJz3wSf/wyn/xiujo6Oqqqr/0C/1vSOampr2viP2viOampr2viP2vST2viOampqampqampr1vyP3viSampr2vyT4vyX3viSbm5ubm5v5wCT8xSmgoKCampqampr3vyb2wiWenp72viOampqZmZmampr2viP2viP1viSampqbm5v2vyT3viObm5v4vyadnZ34wSSbm5v2viSZmZn2viP2vST2viP2viT1viOZmZn2viT2viX3viT3vyb2vyOZmZn1vSOZmZlNN+fKAAAAVHRSTlMA9uz4PQwS8O7r5+fTw4yMelw2MB0dFRELBgbS+/Hfu7uxqKWdg4N7ZmZMPi8pKRgPs0w7Nhb14drKw6Gck21tXkNDIyMZ1rDLycTBtaqVknlfV0sGP8ZwAAADW0lEQVRYw9zWvYqDQBSG4TPDoCAqKhYKQgoVLFaIgZCkiCBBUqVazv3fyu4aEXWdM85Uy779A+LP58AfTQgw73AwtxFiZIwbxMbUfuB3H4b49YNfZrbGodoI52+cm9hH9sbZwwAXOFbo2zjDsSzWxnecuuvaM8MpdtbEPs7y9azF5phZWrjERaWOPdpLbB81cICrgv3W4mvMLbU6RmFQeA5u5HhFEEbHLdWLsMxvHJXxW16Goh+ZqPyny1Az5j79SsCJoWHsBNAxQ9sNF26bWFuMC8v1LY+mmeTadjaqtaNnnXoxWBcde1nNWnzdb68xrOqvu22/MTzuPutujpJ122NvluSb8tTWk85CclDZQwLS0oa2TQpEKacsJy0kSJaQOKJxROKKxhWJ7zS+k9ijsUdim8Y2ZWNUFBP4pMKfOv8onX9WrsI5gd3VVLXtatxcuU0znGUHCUAS2DgrS6mT6hTzrXEjfIZj5Dk2xKkihqm4wKlQfQRqalhUP9UHo3FIPAG/Et44JVLsDDf0JHmB3OEByOwZES8hSAsviGjBdh3ylh6plmMnW4IyAUVJWcE/76vTell1EIaiMBwIAcWBA9GC0lIdKFXQQUsHVVCklN7ojf3+z3JOxYqK2TH555+K6CJJQtRbr9XtDmCnjH0AX9Va8J+liIMvDtRsCk2pEs6hKVexR2g7KuDihwt5a9MfprY0fkLXU9ZmFLpoJolN6GXKWWfZx0tHCocwKJSxC22ItYUEjmBUJHFjfYz1xQxlfaLiZsBExq2IPtbkNbLtOwwuGgjTLkH43mYtSzam7+1Bsr3nm5uExBQUozEh9V7N7uvmwZcqdpm0C6vJW63bZEuXtbrV2zpDzhrpYLBWMnY1mjV7JWFtMio7zbWniWFxvHnWm1yGxXmOPXP+L3YV2ysjnNhaZNeMcHPvuL27BMnVMaujljBAYyje4niH4g2ONyh+4PiB4gOODyjWcKxh1gZBNoJjEY4R/BLhF4IDEQ4QPBoEoyxH4+bxrUsHyxwxQlg0WHXqYifVLmo67cKY/UtaXFxBV26TLjuHrkp8BPJTMij1xQejdkgO24nf7dBOCRcbzQuNOR9Qs64GzzrfQa8It2oFAA6Zrga9xEeq1KHmLUHIiCAWInsg1x/MLqkMsItF8QAAAABJRU5ErkJggg==");
      background-size: 30px auto;
    }
    .starability-result:after {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAB4CAMAAACZ62E6AAABAlBMVEUAAACZmZmampr2vSObm5v/yiufn5+ampr1viP1viSZmZn2viOZmZmampqampr2viSampqampqcnJz5vyScnJz3wSf/wyn/xiujo6Oqqqr/0C/1vSOampr2viP2viOampr2viP2vST2viOampqampqampr1vyP3viSampr2vyT4vyX3viSbm5ubm5v5wCT8xSmgoKCampqampr3vyb2wiWenp72viOampqZmZmampr2viP2viP1viSampqbm5v2vyT3viObm5v4vyadnZ34wSSbm5v2viSZmZn2viP2vST2viP2viT1viOZmZn2viT2viX3viT3vyb2vyOZmZn1vSOZmZlNN+fKAAAAVHRSTlMA9uz4PQwS8O7r5+fTw4yMelw2MB0dFRELBgbS+/Hfu7uxqKWdg4N7ZmZMPi8pKRgPs0w7Nhb14drKw6Gck21tXkNDIyMZ1rDLycTBtaqVknlfV0sGP8ZwAAADW0lEQVRYw9zWvYqDQBSG4TPDoCAqKhYKQgoVLFaIgZCkiCBBUqVazv3fyu4aEXWdM85Uy779A+LP58AfTQgw73AwtxFiZIwbxMbUfuB3H4b49YNfZrbGodoI52+cm9hH9sbZwwAXOFbo2zjDsSzWxnecuuvaM8MpdtbEPs7y9azF5phZWrjERaWOPdpLbB81cICrgv3W4mvMLbU6RmFQeA5u5HhFEEbHLdWLsMxvHJXxW16Goh+ZqPyny1Az5j79SsCJoWHsBNAxQ9sNF26bWFuMC8v1LY+mmeTadjaqtaNnnXoxWBcde1nNWnzdb68xrOqvu22/MTzuPutujpJ122NvluSb8tTWk85CclDZQwLS0oa2TQpEKacsJy0kSJaQOKJxROKKxhWJ7zS+k9ijsUdim8Y2ZWNUFBP4pMKfOv8onX9WrsI5gd3VVLXtatxcuU0znGUHCUAS2DgrS6mT6hTzrXEjfIZj5Dk2xKkihqm4wKlQfQRqalhUP9UHo3FIPAG/Et44JVLsDDf0JHmB3OEByOwZES8hSAsviGjBdh3ylh6plmMnW4IyAUVJWcE/76vTell1EIaiMBwIAcWBA9GC0lIdKFXQQUsHVVCklN7ojf3+z3JOxYqK2TH555+K6CJJQtRbr9XtDmCnjH0AX9Va8J+liIMvDtRsCk2pEs6hKVexR2g7KuDihwt5a9MfprY0fkLXU9ZmFLpoJolN6GXKWWfZx0tHCocwKJSxC22ItYUEjmBUJHFjfYz1xQxlfaLiZsBExq2IPtbkNbLtOwwuGgjTLkH43mYtSzam7+1Bsr3nm5uExBQUozEh9V7N7uvmwZcqdpm0C6vJW63bZEuXtbrV2zpDzhrpYLBWMnY1mjV7JWFtMio7zbWniWFxvHnWm1yGxXmOPXP+L3YV2ysjnNhaZNeMcHPvuL27BMnVMaujljBAYyje4niH4g2ONyh+4PiB4gOODyjWcKxh1gZBNoJjEY4R/BLhF4IDEQ4QPBoEoyxH4+bxrUsHyxwxQlg0WHXqYifVLmo67cKY/UtaXFxBV26TLjuHrkp8BPJTMij1xQejdkgO24nf7dBOCRcbzQuNOR9Qs64GzzrfQa8It2oFAA6Zrga9xEeq1KHmLUHIiCAWInsg1x/MLqkMsItF8QAAAABJRU5ErkJggg==");
      background-size: 30px auto;
    }
  }
  
  @-webkit-keyframes fade {
    0% {
      -webkit-transform: translateY(30px);
              transform: translateY(30px);
    }
    80% {
      opacity: 100%;
    }
    100% {
      -webkit-transform: none;
              transform: none;
      opacity: 0;
    }
  }
  
  @keyframes fade {
    0% {
      -webkit-transform: translateY(30px);
              transform: translateY(30px);
    }
    80% {
      opacity: 100%;
    }
    100% {
      -webkit-transform: none;
              transform: none;
      opacity: 0;
    }
  }
  
  .starability-fade {
    display: block;
    position: relative;
    width: 150px;
    min-height: 60px;
    padding: 0;
    border: none;
    will-change: contents;
  }
  
  .starability-fade > input {
    position: absolute;
    margin-right: -100%;
    opacity: 0;
  }
  
  .starability-fade > input:checked ~ label,
  .starability-fade > input:focus ~ label {
    background-position: 0 0;
  }
  
  .starability-fade > input:checked + label,
  .starability-fade > input:focus + label {
    background-position: 0 -30px;
  }
  
  .starability-fade > input[disabled]:hover + label {
    cursor: default;
  }
  
  .starability-fade > input:not([disabled]):hover ~ label {
    background-position: 0 0;
  }
  
  .starability-fade > input:not([disabled]):hover + label {
    background-position: 0 -30px;
  }
  
  .starability-fade > input:not([disabled]):hover + label::before {
    opacity: 1;
  }
  
  .starability-fade > input:focus + label {
    outline: 1px dotted #999;
  }
  
  .starability-fade .starability-focus-ring {
    position: absolute;
    left: 0;
    width: 100%;
    height: 30px;
    outline: 2px dotted #999;
    pointer-events: none;
    opacity: 0;
  }
  
  .starability-fade > .input-no-rate:focus ~ .starability-focus-ring {
    opacity: 1;
  }
  
  .starability-fade > label {
    position: relative;
    display: inline-block;
    float: left;
    width: 30px;
    height: 30px;
    font-size: 0.1em;
    color: transparent;
    cursor: pointer;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");
    background-repeat: no-repeat;
    background-position: 0 -30px;
  }
  
  .starability-fade > label::before {
    content: '';
    position: absolute;
    display: block;
    height: 30px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");
    background-position: 0 30px;
    pointer-events: none;
    opacity: 0;
  }
  
  .starability-fade > label:nth-of-type(5)::before {
    width: 120px;
    left: -120px;
  }
  
  .starability-fade > label:nth-of-type(4)::before {
    width: 90px;
    left: -90px;
  }
  
  .starability-fade > label:nth-of-type(3)::before {
    width: 60px;
    left: -60px;
  }
  
  .starability-fade > label:nth-of-type(2)::before {
    width: 30px;
    left: -30px;
  }
  
  .starability-fade > label:nth-of-type(1)::before {
    width: 0px;
    left: 0px;
  }
  
  @media screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi) {
    .starability-fade > label {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAB4CAMAAACZ62E6AAABAlBMVEUAAACZmZmampr2vSObm5v/yiufn5+ampr1viP1viSZmZn2viOZmZmampqampr2viSampqampqcnJz5vyScnJz3wSf/wyn/xiujo6Oqqqr/0C/1vSOampr2viP2viOampr2viP2vST2viOampqampqampr1vyP3viSampr2vyT4vyX3viSbm5ubm5v5wCT8xSmgoKCampqampr3vyb2wiWenp72viOampqZmZmampr2viP2viP1viSampqbm5v2vyT3viObm5v4vyadnZ34wSSbm5v2viSZmZn2viP2vST2viP2viT1viOZmZn2viT2viX3viT3vyb2vyOZmZn1vSOZmZlNN+fKAAAAVHRSTlMA9uz4PQwS8O7r5+fTw4yMelw2MB0dFRELBgbS+/Hfu7uxqKWdg4N7ZmZMPi8pKRgPs0w7Nhb14drKw6Gck21tXkNDIyMZ1rDLycTBtaqVknlfV0sGP8ZwAAADW0lEQVRYw9zWvYqDQBSG4TPDoCAqKhYKQgoVLFaIgZCkiCBBUqVazv3fyu4aEXWdM85Uy779A+LP58AfTQgw73AwtxFiZIwbxMbUfuB3H4b49YNfZrbGodoI52+cm9hH9sbZwwAXOFbo2zjDsSzWxnecuuvaM8MpdtbEPs7y9azF5phZWrjERaWOPdpLbB81cICrgv3W4mvMLbU6RmFQeA5u5HhFEEbHLdWLsMxvHJXxW16Goh+ZqPyny1Az5j79SsCJoWHsBNAxQ9sNF26bWFuMC8v1LY+mmeTadjaqtaNnnXoxWBcde1nNWnzdb68xrOqvu22/MTzuPutujpJ122NvluSb8tTWk85CclDZQwLS0oa2TQpEKacsJy0kSJaQOKJxROKKxhWJ7zS+k9ijsUdim8Y2ZWNUFBP4pMKfOv8onX9WrsI5gd3VVLXtatxcuU0znGUHCUAS2DgrS6mT6hTzrXEjfIZj5Dk2xKkihqm4wKlQfQRqalhUP9UHo3FIPAG/Et44JVLsDDf0JHmB3OEByOwZES8hSAsviGjBdh3ylh6plmMnW4IyAUVJWcE/76vTell1EIaiMBwIAcWBA9GC0lIdKFXQQUsHVVCklN7ojf3+z3JOxYqK2TH555+K6CJJQtRbr9XtDmCnjH0AX9Va8J+liIMvDtRsCk2pEs6hKVexR2g7KuDihwt5a9MfprY0fkLXU9ZmFLpoJolN6GXKWWfZx0tHCocwKJSxC22ItYUEjmBUJHFjfYz1xQxlfaLiZsBExq2IPtbkNbLtOwwuGgjTLkH43mYtSzam7+1Bsr3nm5uExBQUozEh9V7N7uvmwZcqdpm0C6vJW63bZEuXtbrV2zpDzhrpYLBWMnY1mjV7JWFtMio7zbWniWFxvHnWm1yGxXmOPXP+L3YV2ysjnNhaZNeMcHPvuL27BMnVMaujljBAYyje4niH4g2ONyh+4PiB4gOODyjWcKxh1gZBNoJjEY4R/BLhF4IDEQ4QPBoEoyxH4+bxrUsHyxwxQlg0WHXqYifVLmo67cKY/UtaXFxBV26TLjuHrkp8BPJTMij1xQejdkgO24nf7dBOCRcbzQuNOR9Qs64GzzrfQa8It2oFAA6Zrga9xEeq1KHmLUHIiCAWInsg1x/MLqkMsItF8QAAAABJRU5ErkJggg==");
      background-size: 30px auto;
    }
  }
  
  @media screen and (-ms-high-contrast: active) {
    .starability-fade {
      width: auto;
    }
    .starability-fade > input {
      position: static;
      margin-right: 0;
      opacity: 1;
    }
    .starability-fade .input-no-rate {
      display: none;
    }
    .starability-fade > label {
      display: inline;
      float: none;
      width: auto;
      height: auto;
      font-size: 1em;
      color: inherit;
      background: none;
    }
    .starability-fade > label::before, .starability-fade > label::after {
      display: none;
    }
  }
  
  .starability-fade > label::after {
    content: ' ';
    position: absolute;
    opacity: 0;
    width: 30px;
    height: 30px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");
    background-repeat: no-repeat;
    background-position: 0 -30px;
    bottom: 30px;
    left: 0;
  }
  
  @media screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi) {
    .starability-fade > label::after {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAB4CAMAAACZ62E6AAABAlBMVEUAAACZmZmampr2vSObm5v/yiufn5+ampr1viP1viSZmZn2viOZmZmampqampr2viSampqampqcnJz5vyScnJz3wSf/wyn/xiujo6Oqqqr/0C/1vSOampr2viP2viOampr2viP2vST2viOampqampqampr1vyP3viSampr2vyT4vyX3viSbm5ubm5v5wCT8xSmgoKCampqampr3vyb2wiWenp72viOampqZmZmampr2viP2viP1viSampqbm5v2vyT3viObm5v4vyadnZ34wSSbm5v2viSZmZn2viP2vST2viP2viT1viOZmZn2viT2viX3viT3vyb2vyOZmZn1vSOZmZlNN+fKAAAAVHRSTlMA9uz4PQwS8O7r5+fTw4yMelw2MB0dFRELBgbS+/Hfu7uxqKWdg4N7ZmZMPi8pKRgPs0w7Nhb14drKw6Gck21tXkNDIyMZ1rDLycTBtaqVknlfV0sGP8ZwAAADW0lEQVRYw9zWvYqDQBSG4TPDoCAqKhYKQgoVLFaIgZCkiCBBUqVazv3fyu4aEXWdM85Uy779A+LP58AfTQgw73AwtxFiZIwbxMbUfuB3H4b49YNfZrbGodoI52+cm9hH9sbZwwAXOFbo2zjDsSzWxnecuuvaM8MpdtbEPs7y9azF5phZWrjERaWOPdpLbB81cICrgv3W4mvMLbU6RmFQeA5u5HhFEEbHLdWLsMxvHJXxW16Goh+ZqPyny1Az5j79SsCJoWHsBNAxQ9sNF26bWFuMC8v1LY+mmeTadjaqtaNnnXoxWBcde1nNWnzdb68xrOqvu22/MTzuPutujpJ122NvluSb8tTWk85CclDZQwLS0oa2TQpEKacsJy0kSJaQOKJxROKKxhWJ7zS+k9ijsUdim8Y2ZWNUFBP4pMKfOv8onX9WrsI5gd3VVLXtatxcuU0znGUHCUAS2DgrS6mT6hTzrXEjfIZj5Dk2xKkihqm4wKlQfQRqalhUP9UHo3FIPAG/Et44JVLsDDf0JHmB3OEByOwZES8hSAsviGjBdh3ylh6plmMnW4IyAUVJWcE/76vTell1EIaiMBwIAcWBA9GC0lIdKFXQQUsHVVCklN7ojf3+z3JOxYqK2TH555+K6CJJQtRbr9XtDmCnjH0AX9Va8J+liIMvDtRsCk2pEs6hKVexR2g7KuDihwt5a9MfprY0fkLXU9ZmFLpoJolN6GXKWWfZx0tHCocwKJSxC22ItYUEjmBUJHFjfYz1xQxlfaLiZsBExq2IPtbkNbLtOwwuGgjTLkH43mYtSzam7+1Bsr3nm5uExBQUozEh9V7N7uvmwZcqdpm0C6vJW63bZEuXtbrV2zpDzhrpYLBWMnY1mjV7JWFtMio7zbWniWFxvHnWm1yGxXmOPXP+L3YV2ysjnNhaZNeMcHPvuL27BMnVMaujljBAYyje4niH4g2ONyh+4PiB4gOODyjWcKxh1gZBNoJjEY4R/BLhF4IDEQ4QPBoEoyxH4+bxrUsHyxwxQlg0WHXqYifVLmo67cKY/UtaXFxBV26TLjuHrkp8BPJTMij1xQejdkgO24nf7dBOCRcbzQuNOR9Qs64GzzrfQa8It2oFAA6Zrga9xEeq1KHmLUHIiCAWInsg1x/MLqkMsItF8QAAAABJRU5ErkJggg==");
      background-size: 30px auto;
    }
  }
  
  .starability-fade > input:checked + label::after {
    opacity: 1;
    -webkit-animation-name: fade;
            animation-name: fade;
    -webkit-animation-duration: 1s;
            animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
  }


```
```html
<form action="/listings/<%= listing._id %>/reviews" method="post" novalidate class="needs-validation">
                    <!-- <div class="form-group mb-3">
                        <label for="rating" class="form-label">Your Rating:</label>
                        <input type="range" min="1" max="5" id="rating" name="review[rating]" class="form-range">
                    </div> -->
                    <fieldset class="starability-fade form-group mb-3">
                        <legend class="form-label">Your Rating:</legend>
                        <input type="radio" id="first-rate1" name="review[rating]" value="1" checked /> <!-- Default selected -->
                        <label for="first-rate1" title="Terrible">1 star</label>
                        <input type="radio" id="first-rate2" name="review[rating]" value="2" />
                        <label for="first-rate2" title="Not good">2 stars</label>
                        <input type="radio" id="first-rate3" name="review[rating]" value="3" />
                        <label for="first-rate3" title="Average">3 stars</label>
                        <input type="radio" id="first-rate4" name="review[rating]" value="4" />
                        <label for="first-rate4" title="Very good">4 stars</label>
                        <input type="radio" id="first-rate5" name="review[rating]" value="5" />
                        <label for="first-rate5" title="Amazing">5 stars</label>
                    </fieldset>
                
                                <!-- <p class="card-text">
                                    <i class="fas fa-star text-warning"></i>
                                    review.rating stars
                                </p> -->
                                
                                <p class="starability-result card-text" data-rating=<%= review.rating %>>
                                </p>
```

# Image Upload
1. Form cannot send file to the backend
2. BSON-(limit) cannot store files

# Steps
1. Make our form capable of seding files
2. Save the files in the third party files(aws,microsoft asure,google cloud,cloudinary(physical computers/data-centers)) which will give url 
3. Save this link in mongo

## **Manupulating Form**

`enctype`= "multipart/form-data"

```html
<div class="mb-3">
    <label for="image" class="form-label"> Upload Image</label>
    <input name="listing[image]" type="file" class="form-control" />
</div>
```
```javascript
app.use(express.urlencoded({ extended: true }));
```
`Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.`
`NOTE: Multer will not process any form which is not multipart (multipart/form-data).`

- [multer](https://www.npmjs.com/package/multer)

```bash
npm i multer
```
```html
                <div class="mb-3" style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; max-width: 100%; box-sizing: border-box;">
                    <label for="image" class="form-label">Image URL</label><br>
                    <input type="file" name="listing[image][url]" accept="image/*, .pdf, .docx, .xlsx" class="form-control">
                </div>
```
```javascript
app.post("/listings",isLoggedIn,upload.single('listing[image][url]'), validateListing, wrapAsync(async (req, res, next) => {
    try {
        if (!req.body.listing) {
            throw new ApiError(400, "Send valid data for listing");
        }

        let listing = req.body.listing;

        // Apply default values if image fields are missing
        // if (!listing.image) {
        //     listing.image = {
        //         filename: "default_filename.png",
        //         url: "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww"
        //     };
        // } else {
        //     // Apply default values if individual image fields are missing
        //     listing.image.filename = listing.image.filename || "default_filename.png";
        //     listing.image.url = listing.image.url || "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww";
        // }

        //Handle the uploaded file
         if (req.file) {
            listing.image = {
                filename: req.file.filename,
                url: `/uploads/${req.file.filename}` // Construct the URL path for the uploaded file
            };
        } else if (!listing.image) {
            listing.image = {
                filename: "default_filename.png",
                url: "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww"
            };
        }


        const newListing = new Listing(listing);
        // console.log(req.user);
        newListing.owner = req.user._id;//req.user is given my the passport
        await newListing.save();

        req.flash('success', 'A new list created successfully!');
        //console.log(req.flash('success')); // To check if flash message is set

        // res.send(req.body);
        console.log("Hello fellas",req.body);
        
        res.redirect("/listing-users");
    } catch (err) {
        next(err); // Pass to error-handling middleware
    }
}));


```

## Cloud Setup
`Cloudinary & .env file`
`.env to store our environment variables`
```
KEY = VALUE
```
* ***Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.***
<!--  to acces .env file in another files -->
`npm i dotenv`

```javascript
const dotenv = require("dotenv")
dotenv.config({
    path: `./.env`
})
```

## Store Files
`Multer Store Cloudinary`
```bash
npm i cloudinary multer-storage-cloudinary
```
- [cloudinary.com](https://console.cloudinary.com/)
- [cloudinary-npm](https://www.npmjs.com/package/cloudinary)
- [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)

```javascript
const dotenv = require("dotenv")
const multer  = require('multer')
const {storage} = require("./src/utils/clodinary.js")
const upload = multer({ dest: 'uploads/' })
```

```javascript
const dotenv = require("dotenv")
const multer  = require('multer')
const {storage} = require("./src/utils/clodinary.js")
const upload = multer({ storage })
```

The error you're encountering is due to a conflict between the cloudinary and multer-storage-cloudinary package versions. 
Specifically, multer-storage-cloudinary@4.0.0 expects cloudinary@^1.21.0, but you have cloudinary@2.4.0 installed.
 
You can downgrade your cloudinary package to a version compatible with multer-storage-cloudinary:

uninstall the current version of cloudinary:
npm uninstall cloudinary
Install the older version of cloudinary that is compatible:
npm install cloudinary@1.21.0 multer-storage-cloudinary

cloudinary.v1, which does not support the config method. The config method is available in cloudinary.v2


https://cloudinary.com/documentation/image_transformations#transformation_url_structure
---

```javascript
const express = require("express");
const Listing = require("./src/models/listing.models.js")
const Review = require("./src/models/review.models.js")
const ApiResponse = require("./src/utils/ApiResponse.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./src/utils/AsyncHandler.js")
const ApiError = require("./src/utils/ApiError.js")
const { listingSchema, reviewSchema } = require("./schema.js")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const localStrategy = require("passport-local");
```
---
```javascript
// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);


app.use(cookieParser());

const sessionOptions = {
    secret: "my secret key",
    resave: false,//resave: true | Doesn't save the session if it wasn't modified for false
    saveUninitialized: true,//Saves a new session even if it hasn't been modified
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,// 1 week 24 hours 60 minutes 60 seconds 1000 seconds // 1week is the expiry time
        maxAge: 7 * 24 * 60 * 60 * 1000,/* maxAge: 1000 * 60 * 60 * 24 * 3 | maxAge: 60000  //1 minute */
        httpOnly: true,// bydefault for security purposes like cross scripting attacks for prevention of cross scripting attacks we are setting httpOny to true
        secure: false // Set to false for local development (HTTP); true for production (HTTPS)
    }
}//sessionOptions, the secure flag is set to true. This means the cookie will only be sent over HTTPS connections. For local development over HTTP, you should set this to false.

app.use(session(sessionOptions));
app.use(flash());
// after then routes

app.use("*", (req, res, next) => {
    res.locals.msgs = req.flash("success");// to accesss in a template we use res.locals
    res.locals.err = req.flash("error")
    // res.locals.err = req.flash("error");
    // console.log(res.locals.msgs);
    next();
})

```

---
# ***Models***
* *MAJORPROJECT\src\models\listing.models.js*
```javascript
const mongoose = require("mongoose");
const review = require("./review.models.js");
const Review = require("./review.models.js");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String, 
    image: {
        filename: {
            type: String,
            default: "default_filename.png" 
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww" // Default URL
        }
    },
    price: Number,
    location: String,
    country: {
        type: String,
        required: true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, { timestamps: true });

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
    console.log("Listing and associated reviews deleted successfully");
  }
  
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

*/
```
---
* *MAJORPROJECT\src\models\review.models.js*
```javascript
//MAJORPROJECT\src\models\review.models.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost:27017/myDatabase", { useNewUrlParser: true, useUnifiedTopology: true });

const reviewSchema = new Schema({
    comment: String,
    rating:{
        type: Number,
        min: 1,
        max: 5,
        // required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
},{timestamps:true});

const Review = mongoose.model("Review",reviewSchema);

module.exports = Review;//1 to many relation [reviews]
```
---
* *MAJORPROJECT\src\models\user.models.js*
```javascript
const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    //     // minlength: 
    // }
}, { timestamps: true })


const User = mongoose.model("User", userSchema);

User.plugin(passportLocalMongoose);

module.exports = User;
/*Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value. */
```

# ***Database Connection***
* *MAJORPROJECT\src\db\index.js*
```javascript
const mongoose = require('mongoose');

// Import the DB_NAME constant from the contants.js file
const DB_NAME = require('../contants.js');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
        console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
        console.log(`Connected to DB: ${mongoose.connection.name}`); // Log the connected DB name
    } catch (err) {
        console.log("MONGODB connection failed", err);
        process.exit(1);
    }
};

// Export the connectDB function
module.exports = connectDB;
```
---
* *MAJORPROJECT\index.js*
```javascript
// const express = require("express");
const connectDB = require("./src/db/index.js")
const dotenv = require("dotenv")
const app = require("./app.js"); // Import app directly
// import dotenv from "dotenv"
// import { app } from "./app.js";


// const app = express();

dotenv.config({
    path: `./.env`
})

connectDB()
    .then(() => {

        app.on("err", (err) => {
            console.log(err);
            throw err;
        })

        const PORT = process.env.PORT || 8000

        app.listen(PORT, () => { // middleware
            console.log(`Server running at http://localhost:${process.env.PORT}`);
        });

    })
    .catch((err) => {
        console.log("MONGO DB ERROR!", err);
    })
// npx nodemon index.js
// router inside controller but it can be also in different file
// app.get("/",(req,res)=>{
//     res.send("Hi")
// })
/*
cd C:\Users\SUDIP BHATTACHARYA\Desktop\BACK_PROJECTS\MAJORPROJECT
rd /s /q classroom
*/

```

<!-- whole code of the app then remove the comments from the original code except the important ones -->