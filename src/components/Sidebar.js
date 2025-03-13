import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-xl font-bold mb-6">企業管理システム</div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/employees"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              社員検索
            </Link>
          </li>
          <li>
            <Link
              href="/clients"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              取引先検索
            </Link>
          </li>
          <li>
            <Link
              href="/equipment"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              備品検索
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
