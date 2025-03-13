"use client";

import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import DataTable from "../../components/DataTable";
import { getEmployees } from "../../firebase/firestore";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { header: "社員ID", accessor: "employeeId" },
    { header: "名前", accessor: "name" },
    { header: "部署", accessor: "department" },
    { header: "役職", accessor: "position" },
    { header: "メールアドレス", accessor: "email" },
    { header: "電話番号", accessor: "phone" },
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (term = "") => {
    try {
      setLoading(true);
      const data = await getEmployees(term);
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError("社員データの取得中にエラーが発生しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchEmployees(term);
  };

  // サンプルデータ（実際はFirebaseから取得）
  const sampleEmployees = [
    {
      id: "1",
      employeeId: "EMP001",
      name: "山田 太郎",
      department: "営業部",
      position: "部長",
      email: "yamada.taro@example.com",
      phone: "03-1234-5678",
    },
    {
      id: "2",
      employeeId: "EMP002",
      name: "佐藤 花子",
      department: "人事部",
      position: "マネージャー",
      email: "sato.hanako@example.com",
      phone: "03-2345-6789",
    },
    {
      id: "3",
      employeeId: "EMP003",
      name: "鈴木 一郎",
      department: "技術部",
      position: "エンジニア",
      email: "suzuki.ichiro@example.com",
      phone: "03-3456-7890",
    },
    {
      id: "4",
      employeeId: "EMP004",
      name: "田中 美咲",
      department: "マーケティング部",
      position: "アシスタント",
      email: "tanaka.misaki@example.com",
      phone: "03-4567-8901",
    },
    {
      id: "5",
      employeeId: "EMP005",
      name: "高橋 健太",
      department: "財務部",
      position: "アナリスト",
      email: "takahashi.kenta@example.com",
      phone: "03-5678-9012",
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">社員検索</h1>

      <SearchBar placeholder="社員名で検索..." onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-4">読み込み中...</div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={employees.length > 0 ? employees : sampleEmployees}
          emptyMessage="該当する社員が見つかりません"
        />
      )}
    </div>
  );
}
