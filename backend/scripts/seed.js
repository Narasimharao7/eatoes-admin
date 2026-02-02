import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany();
    await Order.deleteMany();

    console.log("🗑️ Old data removed");

    // -------------------------
    // MENU ITEMS
    // -------------------------
    const menuItems = await MenuItem.insertMany([
      {
        name: "Veg Burger",
        category: "Main Course",
        price: 120,
        ingredients: ["Bun", "Veg Patty", "Lettuce"],
      },
      {
        name: "Chicken Burger",
        category: "Main Course",
        price: 180,
        ingredients: ["Bun", "Chicken Patty", "Mayo"],
      },
      {
        name: "French Fries",
        category: "Appetizer",
        price: 90,
        ingredients: ["Potato", "Salt"],
      },
      {
        name: "Paneer Tikka",
        category: "Appetizer",
        price: 200,
        ingredients: ["Paneer", "Spices"],
      },
      {
        name: "Margherita Pizza",
        category: "Main Course",
        price: 250,
        ingredients: ["Cheese", "Tomato Sauce"],
      },
      {
        name: "Brownie",
        category: "Dessert",
        price: 150,
        ingredients: ["Chocolate"],
      },
      {
        name: "Ice Cream",
        category: "Dessert",
        price: 100,
        ingredients: ["Milk", "Sugar"],
      },
      {
        name: "Cold Coffee",
        category: "Beverage",
        price: 110,
        ingredients: ["Coffee", "Milk"],
      },
      {
        name: "Lemon Soda",
        category: "Beverage",
        price: 60,
        ingredients: ["Lemon", "Soda"],
      },
      {
        name: "Veg Fried Rice",
        category: "Main Course",
        price: 160,
        ingredients: ["Rice", "Vegetables"],
      },
      {
        name: "Chicken Biryani",
        category: "Main Course",
        price: 280,
        ingredients: ["Rice", "Chicken", "Spices"],
      },
      {
        name: "Gulab Jamun",
        category: "Dessert",
        price: 90,
        ingredients: ["Milk Solids", "Sugar Syrup"],
      },
      {
        name: "Masala Dosa",
        category: "Main Course",
        price: 140,
        ingredients: ["Rice Batter", "Potato"],
      },
      {
        name: "Samosa",
        category: "Appetizer",
        price: 40,
        ingredients: ["Potato", "Flour"],
      },
      {
        name: "Green Tea",
        category: "Beverage",
        price: 50,
        ingredients: ["Tea Leaves"],
      },
    ]);

    console.log("🍔 Menu items seeded");

    // -------------------------
    // ORDERS
    // -------------------------
    const orders = [
      {
        items: [
          { menuItem: menuItems[0]._id, quantity: 2 },
          { menuItem: menuItems[2]._id, quantity: 1 },
        ],
        customerName: "Ramesh",
        tableNumber: 3,
      },
      {
        items: [{ menuItem: menuItems[10]._id, quantity: 1 }],
        customerName: "Suresh",
        tableNumber: 1,
      },
      {
        items: [
          { menuItem: menuItems[4]._id, quantity: 1 },
          { menuItem: menuItems[8]._id, quantity: 2 },
        ],
        customerName: "Anita",
        tableNumber: 5,
      },
    ];

    for (let order of orders) {
      let totalAmount = 0;
      const formattedItems = [];

      for (let item of order.items) {
        const menuItem = menuItems.find(
          (m) => m._id.toString() === item.menuItem.toString(),
        );

        totalAmount += menuItem.price * item.quantity;

        formattedItems.push({
          menuItem: menuItem._id,
          quantity: item.quantity,
          price: menuItem.price,
        });
      }

      await Order.create({
        items: formattedItems,
        totalAmount,
        customerName: order.customerName,
        tableNumber: order.tableNumber,
      });
    }

    console.log("Orders seeded");
    console.log("Database seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
