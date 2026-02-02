import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";

// GET all orders
export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate("items.menuItem");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/orders/:id
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

/**
 * POST /api/orders
 */
export const createOrder = async (req, res) => {
  try {
    const { items, customerName, tableNumber } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    let totalAmount = 0;
    const formattedItems = [];

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      totalAmount += menuItem.price * item.quantity;

      formattedItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    const order = new Order({
      items: formattedItems,
      totalAmount,
      customerName,
      tableNumber,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

// /**
//  * PATCH /api/orders/:id/status
//  */
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const allowedStatus = [
//       "Pending",
//       "Preparing",
//       "Ready",
//       "Delivered",
//       "Cancelled",
//     ];

//     if (!allowedStatus.includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.status = status;
//     await order.save();

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update order status" });
//   }
// };

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
