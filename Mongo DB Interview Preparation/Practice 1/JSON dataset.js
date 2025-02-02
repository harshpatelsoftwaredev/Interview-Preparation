// ✅ Create Operations (insertOne(), insertMany())

// 📌 Insert a Single User (insertOne)

     db.users.insertOne({
         name: "David Miller",
         email: "david@example.com",
         age: 29,
         isActive: true,
         createdAt: new Date("2023-08-21T10:00:00Z"),
         orders: [
           {
             orderId: ObjectId(),
             amount: 89.99,
             items: ["Smartwatch"],
             orderDate: new Date("2023-09-01T14:30:00Z"),
             status: "Delivered"
           }
         ],
         address: {
           street: "987 Sunset Blvd",
           city: "Chicago",
           zipcode: "60601"
         },
         preferences: {
           newsletter: true,
           notifications: ["email", "push"]
         }
       });

  
//   📌 Insert Multiple Users (insertMany)
        
     db.users.insertMany([
         {
           name: "Eve Adams",
           email: "eve@example.com",
           age: 33,
           isActive: false,
           createdAt: new Date("2023-07-10T12:15:00Z"),
           orders: [],
           address: {
             street: "159 Pine St",
             city: "Seattle",
             zipcode: "98101"
           },
           preferences: {
             newsletter: false,
             notifications: ["sms"]
           }
         },
         {
           name: "Frank White",
           email: "frank@example.com",
           age: 45,
           isActive: true,
           createdAt: new Date("2023-06-25T09:45:00Z"),
           orders: [
             {
               orderId: ObjectId(),
               amount: 150.50,
               items: ["Headphones", "Charger"],
               orderDate: new Date("2023-07-15T16:00:00Z"),
               status: "Shipped"
             }
           ],
           address: {
             street: "789 Elm St",
             city: "Boston",
             zipcode: "02108"
           },
           preferences: {
             newsletter: true,
             notifications: ["email"]
           }
         }
       ]);
   
  
// ✅ Read Operations (find(), findOne())

// 📌 Find All Users (find())

     db.users.find();

// 📌 Find One User (findOne())

     db.users.findOne({ email: "alice@example.com" });

// 📌 Find Users Older Than 30 ($gt - Greater Than)

     db.users.find({ age: { $gt: 30 } });

// 📌 Find Users Aged Between 25 and 40 ($gte, $lte)

     db.users.find({ age: { $gte: 25, $lte: 40 } });

// 📌 Find Users from Specific Cities ($in Operator)

     db.users.find({ "address.city": { $in: ["New York", "Los Angeles"] } });


// ✅ Update Operations (updateOne(), updateMany())

// 📌 Update a User's Age ($set Operator)

db.users.updateOne({ email: "alice@example.com" }, { $set: { age: 30 } });

// 📌 Update Multiple Users: Set isActive: false for Users Over 40 (updateMany())

db.users.updateMany({ age: { $gt: 40 } }, { $set: { isActive: false } });

// 📌 Remove a Field ($unset Operator)

db.users.updateOne({ email: "alice@example.com" }, { $unset: { preferences: "" } });

// 📌 Increment Age by 1 ($inc Operator)

db.users.updateOne({ email: "bob@example.com" }, { $inc: { age: 1 } });

// 📌 Add a New Notification Method ($push Operator)

db.users.updateOne({ email: "alice@example.com" }, { $push: { "preferences.notifications": "whatsapp" } });

// 📌 Remove an Item from Notifications ($pull Operator)

db.users.updateOne({ email: "alice@example.com" }, { $pull: { "preferences.notifications": "sms" } });



// ✅ Delete Operations (deleteOne(), deleteMany())

// 📌 Delete a Single User (deleteOne())

db.users.deleteOne({ email: "alice@example.com" });

// 📌 Delete All Inactive Users (deleteMany())

db.users.deleteMany({ isActive: false });

