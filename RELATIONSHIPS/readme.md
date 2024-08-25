
#Mongo Relationships
---------------------

## Relationships
### SQL(via Foreign Keys)

* One to one(1:1)
* one to many(1:n)
* many to many(m:n)

# One to one(1:1)

groom------relationship------bride
### Table: Groom

| id | name | age | bride_id |
|----|------|-----|----------|
| 1  | John | 30  | 1        |

### Table: Bride

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


*Explanation: This is a one-to-one (1:1) relationship where each groom is associated with exactly one bride, and vice versa. The bride_id in the Groom table points to the specific bride in the Bride table that the groom is married to.*

# one to many(1:n)

## company----employs------Employees

Table: Student
### Table: Company

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

- Cardinality

Mongo Relationships

One to Many / Approach 1(one to few)

Store the child document inside parent document
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

## One to Many / Approach 3(one to squillions)

Strore a reference to the present document inside child

{
   "_id": "ObjectId(\"651d1b11697616419cbf5520\")",
   content: "Hello World!",
   likes:7,
   user: ObjectId(\"651d1b11697616419cbf5520\"),
   __v:0
},
{
   "_id": "ObjectId(\"651d1b11697616419cbf5520\")",
   content: "Bye!",
   likes:7,
   user: ObjectId(\"651d1b11697616419cbf5520\"),
   __v:0
}

links I been through
https://mongoosejs.com/
https://mongoosejs.com/docs/index.html
https://mongoosejs.com/docs/populate.html
https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
https://mongoosejs.com/docs/middleware.html#pre




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

### *Types of Middleware*
- [middleware](https://mongoosejs.com/docs/middleware.html)
- [types-of-middleware](https://mongoosejs.com/docs/middleware.html#types-of-middleware)
#### *Mongoose has 4 types of middleware:*
* 1.*document middleware*
* 2.*Query middleware*
* *Query middleware is supported for the following Query functions. Query middleware executes when you call exec() or then() on a Query object, or await on a Query object. In query middleware functions, this refers to the query.*
* 3. *Aggregate middleware*

##### 2.*Query middleware*
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


