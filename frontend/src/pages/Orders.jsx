import { useEffect, useState } from "react";
import api from "../services/api";
import OrderRow from "../components/OrderRow";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const limit = 5; // 5 orders per page

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = `/orders?page=${page}&limit=${limit}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      const res = await api.get(url);
      setOrders(res.data);
    } catch (err) {
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    const prevOrders = [...orders];
    setOrders(orders.map((o) => (o._id === id ? { ...o, status } : o)));

    try {
      await api.patch(`/orders/${id}/status`, { status });
    } catch (err) {
      setOrders(prevOrders);
      alert("Failed to update status, reverting...");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Orders Dashboard</h2>

      {/* STATUS FILTER */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          {["Pending", "Preparing", "Ready", "Delivered", "Cancelled"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ),
          )}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Order #</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Table</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Update Status</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onStatusChange={updateStatus}
                  onExpand={setSelectedOrder}
                />
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>
            <span className="px-3 py-1">{page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>

          {/* EXPAND ORDER DETAILS */}
          {selectedOrder && (
            <div className="mt-4 p-4 border rounded bg-white">
              <h3 className="text-xl font-bold mb-2">Order Details</h3>
              {selectedOrder.items.map((item) => (
                <p key={item.menuItem._id}>
                  {item.menuItem.name} x {item.quantity} = ₹
                  {item.price * item.quantity}
                </p>
              ))}
              <p className="mt-2 font-bold">
                Total: ₹{selectedOrder.totalAmount}
              </p>
              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-2 px-3 py-1 border rounded"
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
