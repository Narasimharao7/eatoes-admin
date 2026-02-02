import { useState, useEffect } from "react";

export default function MenuModal({ isOpen, onClose, onSave, menuItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (menuItem) {
      setName(menuItem.name);
      setCategory(menuItem.category);
      setPrice(menuItem.price);
      setImageUrl(menuItem.imageUrl || "");
      setIsAvailable(menuItem.isAvailable);
    } else {
      setName("");
      setCategory("");
      setPrice("");
      setImageUrl("");
      setIsAvailable(true);
    }
  }, [menuItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !price) return alert("Fill all required fields");
    onSave({
      name,
      category,
      price,
      imageUrl,
      isAvailable,
      _id: menuItem?._id,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">
          {menuItem ? "Edit" : "Add"} Menu Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
            <label>Available</label>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
