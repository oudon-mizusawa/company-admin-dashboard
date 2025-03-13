import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        企業管理システム ダッシュボード
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-600 text-xl font-semibold mb-2">社員情報</h2>
          <p className="text-gray-600 mb-4">登録社員数: 125名</p>
          <Link
            href="/employees"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            社員検索へ →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-600 text-xl font-semibold mb-2">
            取引先情報
          </h2>
          <p className="text-gray-600 mb-4">登録取引先数: 48社</p>
          <Link
            href="/clients"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            取引先検索へ →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">備品情報</h2>
          <p className="text-gray-600 mb-4">登録備品数: 312点</p>
          <Link
            href="/equipment"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            備品検索へ →
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">最近の更新</h2>
        <ul className="space-y-3">
          <li className="pb-3 border-b">
            <p className="font-medium text-gray-600">
              新入社員3名が追加されました
            </p>
            <p className="text-sm text-gray-500">2025年3月10日</p>
          </li>
          <li className="pb-3 border-b ">
            <p className="font-medium text-gray-600">
              株式会社テクノソリューションとの取引が開始されました
            </p>
            <p className="text-sm text-gray-500">2025年3月5日</p>
          </li>
          <li>
            <p className="font-medium text-gray-600">
              新しいノートパソコン20台が備品として登録されました
            </p>
            <p className="text-sm text-gray-500">2025年2月28日</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
