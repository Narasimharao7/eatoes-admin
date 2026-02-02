import { useEffect, useState } from "react";
import api from "../services/api";
import MenuCard from "../components/MenuCard";
import MenuModal from "../components/MenuModal";
import useDebounce from "../hooks/useDebounce";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetchMenu();
  }, [debouncedSearch, category]);

  // FETCH MENU ITEMS
  const fetchMenu = async () => {
    setLoading(true);
    try {
      let url = "/menu";

      if (debouncedSearch) {
        url = `/menu/search?q=${debouncedSearch}`;
      }

      if (category) {
        url += debouncedSearch
          ? `&category=${category}`
          : `?category=${category}`;
      }

      const res = await api.get(url);
      setMenu(res.data);
    } catch (err) {
      alert("Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  };

  // OPTIMISTIC UI TOGGLE AVAILABILITY
  const toggleAvailability = async (id, currentStatus) => {
    const prevMenu = [...menu];
    setMenu(
      menu.map((item) =>
        item._id === id ? { ...item, isAvailable: !currentStatus } : item,
      ),
    );

    try {
      await api.patch(`/menu/${id}/availability`);
    } catch (err) {
      setMenu(prevMenu);
      alert("Failed to update status, reverting...");
    }
  };

  // OPEN MODAL
  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  // SAVE ITEM (CREATE / UPDATE)
  const saveItem = async (data) => {
    try {
      if (data._id) {
        // UPDATE
        await api.put(`/menu/${data._id}`, data);
        setMenu(menu.map((m) => (m._id === data._id ? data : m)));
      } else {
        // CREATE
        const res = await api.post("/menu", data);
        setMenu([...menu, res.data]);
      }
      setModalOpen(false);
    } catch (err) {
      alert("Failed to save item");
    }
  };

  // DELETE ITEM
  const deleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`/menu/${id}`);
      setMenu(menu.filter((m) => m._id !== id));
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  return (
    <div>
      {/* HEADER + ADD BUTTON */}
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-semibold">Menu Management</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Menu Item
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>
      </div>

      {/* MENU GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menu.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onToggle={toggleAvailability}
              onEdit={() => openEditModal(item)}
              onDelete={() => deleteItem(item._id)}
            />
          ))}
        </div>
      )}

      {/* MENU MODAL */}
      <MenuModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveItem}
        menuItem={editingItem}
      />
    </div>
  );
}
