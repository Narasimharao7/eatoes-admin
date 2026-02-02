export default function OrderRow({ order, onStatusChange, onExpand }) {
  const statusColors = {
    Pending: "bg-yellow-300",
    Preparing: "bg-blue-300",
    Ready: "bg-green-300",
    Delivered: "bg-gray-400",
    Cancelled: "bg-red-400",
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{order.orderNumber}</td>
      <td className="px-4 py-2">{order.customerName}</td>
      <td className="px-4 py-2">{order.tableNumber}</td>
      <td className="px-4 py-2">₹{order.totalAmount}</td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 rounded ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </td>
      <td className="px-4 py-2">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className="border rounded p-1"
        >
          {["Pending", "Preparing", "Ready", "Delivered", "Cancelled"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ),
          )}
        </select>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => onExpand(order)}
          className="text-blue-500 hover:underline"
        >
          View
        </button>
      </td>
    </tr>
  );
}
