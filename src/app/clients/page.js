"use client";

import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import DataTable from "../../components/DataTable";
import { getClients } from "../../firebase/firestore";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { header: "会社名", accessor: "companyName" },
    { header: "業種", accessor: "industry" },
    { header: "担当者", accessor: "contactPerson" },
    { header: "メールアドレス", accessor: "email" },
    { header: "電話番号", accessor: "phone" },
    { header: "住所", accessor: "address" },
  ];

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async (term = "") => {
    try {
      setLoading(true);
      const data = await getClients(term);
      setClients(data);
      setError(null);
    } catch (err) {
      setError("取引先データの取得中にエラーが発生しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchClients(term);
  };

  // サンプルデータ（実際はFirebaseから取得）
  const sampleClients = [
    {
      id: "1",
      companyName: "株式会社テクノソリューション",
      industry: "IT",
      contactPerson: "佐々木 健太",
      email: "sasaki@technosolution.co.jp",
      phone: "03-1234-5678",
      address: "東京都港区芝浦3-4-1",
    },
    {
      id: "2",
      companyName: "グローバル商事株式会社",
      industry: "商社",
      contactPerson: "田中 誠",
      email: "tanaka@global-trading.co.jp",
      phone: "03-2345-6789",
      address: "東京都千代田区丸の内1-2-3",
    },
    {
      id: "3",
      companyName: "未来建設株式会社",
      industry: "建設",
      contactPerson: "鈴木 大輔",
      email: "suzuki@mirai-construction.co.jp",
      phone: "03-3456-7890",
      address: "東京都新宿区西新宿2-1-1",
    },
    {
      id: "4",
      companyName: "エコエナジー株式会社",
      industry: "エネルギー",
      contactPerson: "山本 裕子",
      email: "yamamoto@eco-energy.co.jp",
      phone: "03-4567-8901",
      address: "東京都品川区大崎1-2-2",
    },
    {
      id: "5",
      companyName: "ヘルスケアパートナーズ株式会社",
      industry: "医療",
      contactPerson: "中村 美香",
      email: "nakamura@healthcare-partners.co.jp",
      phone: "03-5678-9012",
      address: "東京都文京区本郷3-2-3",
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">取引先検索</h1>

      <SearchBar placeholder="会社名で検索..." onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-4">読み込み中...</div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={clients.length > 0 ? clients : sampleClients}
          emptyMessage="該当する取引先が見つかりません"
        />
      )}
    </div>
  );
}
