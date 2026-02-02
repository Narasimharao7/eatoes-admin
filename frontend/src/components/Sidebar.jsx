import { NavLink } from "react-router-dom";
import { LayoutDashboard, Utensils, ShoppingBag } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-5">
      <h1 className="text-2xl font-bold mb-8">🍔 Eatoes Admin</h1>

      <nav className="space-y-4">
        <NavLink to="/" className="flex gap-3 items-center">
          <LayoutDashboard /> Dashboard
        </NavLink>

        <NavLink to="/menu" className="flex gap-3 items-center">
          <Utensils /> Menu
        </NavLink>

        <NavLink to="/orders" className="flex gap-3 items-center">
          <ShoppingBag /> Orders
        </NavLink>
      </nav>
    </div>
  );
}
