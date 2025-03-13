"use client";

import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import DataTable from "../../components/DataTable";
import { getEquipment } from "../../firebase/firestore";

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { header: "備品ID", accessor: "equipmentId" },
    { header: "備品名", accessor: "name" },
    { header: "カテゴリ", accessor: "category" },
    { header: "メーカー", accessor: "manufacturer" },
    { header: "購入日", accessor: "purchaseDate" },
    { header: "状態", accessor: "status" },
    { header: "使用部署", accessor: "department" },
  ];

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async (term = "") => {
    try {
      setLoading(true);
      const data = await getEquipment(term);
      setEquipment(data);
      setError(null);
    } catch (err) {
      setError("備品データの取得中にエラーが発生しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchEquipment(term);
  };

  // サンプルデータ（実際はFirebaseから取得）
  const sampleEquipment = [
    {
      id: "1",
      equipmentId: "EQ001",
      name: "ノートパソコン Dell XPS 13",
      category: "IT機器",
      manufacturer: "Dell",
      purchaseDate: "2024-12-15",
      status: "使用中",
      department: "技術部",
    },
    {
      id: "2",
      equipmentId: "EQ002",
      name: "プロジェクター EPSON EB-L520",
      category: "会議室機器",
      manufacturer: "EPSON",
      purchaseDate: "2024-11-05",
      status: "使用中",
      department: "会議室A",
    },
    {
      id: "3",
      equipmentId: "EQ003",
      name: "複合機 Canon imageRUNNER",
      category: "オフィス機器",
      manufacturer: "Canon",
      purchaseDate: "2024-10-20",
      status: "使用中",
      department: "共有エリア",
    },
    {
      id: "4",
      equipmentId: "EQ004",
      name: "iPad Pro 12.9インチ",
      category: "IT機器",
      manufacturer: "Apple",
      purchaseDate: "2025-01-10",
      status: "使用中",
      department: "マーケティング部",
    },
    {
      id: "5",
      equipmentId: "EQ005",
      name: "会議用マイクスピーカー Poly Sync 40",
      category: "会議室機器",
      manufacturer: "Poly",
      purchaseDate: "2024-12-28",
      status: "使用中",
      department: "会議室B",
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">備品検索</h1>

      <SearchBar placeholder="備品名で検索..." onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-4">読み込み中...</div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={equipment.length > 0 ? equipment : sampleEquipment}
          emptyMessage="該当する備品が見つかりません"
        />
      )}
    </div>
  );
}
