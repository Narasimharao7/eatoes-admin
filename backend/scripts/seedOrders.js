import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";

dotenv.config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    await Order.deleteMany();
    console.log("🗑️ Old orders removed");

    const menuItems = await MenuItem.find();
    if (menuItems.length < 3) {
      throw new Error("Not enough menu items to create orders");
    }

    const orders = [
      {
        customerName: "Ravi Kumar",
        tableNumber: 3,
        status: "Pending",
        items: [
          {
            menuItem: menuItems[0]._id,
            quantity: 2,
            price: menuItems[0].price,
          },
          {
            menuItem: menuItems[1]._id,
            quantity: 1,
            price: menuItems[1].price,
          },
        ],
      },
      {
        customerName: "Anjali",
        tableNumber: 5,
        status: "Preparing",
        items: [
          {
            menuItem: menuItems[2]._id,
            quantity: 1,
            price: menuItems[2].price,
          },
        ],
      },
      {
        customerName: "Suresh",
        tableNumber: 1,
        status: "Ready",
        items: [
          {
            menuItem: menuItems[1]._id,
            quantity: 3,
            price: menuItems[1].price,
          },
        ],
      },
      {
        customerName: "Pooja",
        tableNumber: 2,
        status: "Delivered",
        items: [
          {
            menuItem: menuItems[0]._id,
            quantity: 1,
            price: menuItems[0].price,
          },
        ],
      },
      {
        customerName: "Rahul",
        tableNumber: 6,
        status: "Cancelled",
        items: [
          {
            menuItem: menuItems[3]._id,
            quantity: 2,
            price: menuItems[3].price,
          },
        ],
      },
    ];

    for (let order of orders) {
      order.totalAmount = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    }

    await Order.insertMany(orders);
    console.log("Orders seeded successfully");

    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedOrders();
