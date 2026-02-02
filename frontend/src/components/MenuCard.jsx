export default function MenuCard({ item, onToggle, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col">
      {/* IMAGE */}
      <div className="w-full h-44 overflow-hidden rounded-lg mb-3 bg-gray-100">
        <img
          src={item.imageUrl || "https://via.placeholder.com/300"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* ITEM INFO */}
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.category}</p>
      <p className="mt-1 font-bold">₹{item.price}</p>

      {/* AVAILABILITY TOGGLE */}
      <button
        onClick={() => onToggle(item._id, item.isAvailable)}
        className={`mt-3 w-full py-1 rounded text-white ${
          item.isAvailable
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {item.isAvailable ? "Available" : "Unavailable"}
      </button>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="flex-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
