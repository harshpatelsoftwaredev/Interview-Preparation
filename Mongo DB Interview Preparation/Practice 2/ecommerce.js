// 1. CRUD Operations
// ------------------

// Insert (with string ID for _id):
db.users.insertOne({
    "_id": "507f1f77bcf86cd799439013",  // String ID
    "name": "Alice Brown",
    "email": "alice.brown@example.com",
    "age": 28,
    "address": {
      "city": "Chicago",
      "zip": "60601"
    },
    "orders": []
  });


//   Update (with string ID for _id):
db.users.updateOne(
    { _id: "507f1f77bcf86cd799439011" },  // String ID
    { $set: { age: 31 } }
  );

  
//   Delete (with string ID for _id):
db.users.deleteOne({ _id: "507f1f77bcf86cd799439013" });  // String ID

// 2. Querying
// -----------

// Find all users older than 25:
db.users.find({ age: { $gt: 25 } });

// Find orders with status "completed":
db.orders.find({ status: "completed" });

// Find products in the "Electronics" category:
db.products.find({ category: "Electronics" });



// 3. Aggregation
// --------------

// Total revenue by user:
db.orders.aggregate([
    { $group: { _id: "$userId", totalRevenue: { $sum: "$totalAmount" } } }
  ]);

  
// Average order amount:
db.orders.aggregate([
    { $group: { _id: null, averageAmount: { $avg: "$totalAmount" } } }
  ]);
  


// 4. Indexing

// Create an index on the email field in the users collection:
db.users.createIndex({ email: 1 });

// Create a compound index on category and price in the products collection:
db.products.createIndex({ category: 1, price: 1 });


// 5. Transactions

// Transfer an order from one user to another (with string IDs for _id):
const session = db.getMongo().startSession();
session.startTransaction();
try {
  const users = session.getDatabase("test").users;
  const orders = session.getDatabase("test").orders;

  // Remove order from user1
  users.updateOne(
    { _id: "507f1f77bcf86cd799439011" },  // String ID
    { $pull: { orders: "607f1f77bcf86cd799439021" } },  // String ID
    { session }
  );

  // Add order to user2
  users.updateOne(
    { _id: "507f1f77bcf86cd799439012" },  // String ID
    { $push: { orders: "607f1f77bcf86cd799439021" } },  // String ID
    { session }
  );

  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
} finally {
  session.endSession();
}


// 6. Sharding

// Enable sharding on the orders collection:
sh.enableSharding("test");
sh.shardCollection("test.orders", { userId: 1 });
