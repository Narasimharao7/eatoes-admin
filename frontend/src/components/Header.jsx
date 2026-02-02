export default function Header({ title }) {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="text-sm text-gray-600">Admin</div>
    </div>
  );
}
