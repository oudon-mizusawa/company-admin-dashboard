import { db } from "./config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// 社員データの取得
export async function getEmployees(searchTerm = "") {
  try {
    const employeesRef = collection(db, "employees");
    let q = employeesRef;

    if (searchTerm) {
      // 名前で検索（前方一致）
      q = query(
        employeesRef,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
        orderBy("name"),
        limit(20)
      );
    } else {
      q = query(employeesRef, orderBy("name"), limit(20));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("社員データの取得に失敗しました:", error);
    return [];
  }
}

// 取引先データの取得
export async function getClients(searchTerm = "") {
  try {
    const clientsRef = collection(db, "clients");
    let q = clientsRef;

    if (searchTerm) {
      // 会社名で検索（前方一致）
      q = query(
        clientsRef,
        where("companyName", ">=", searchTerm),
        where("companyName", "<=", searchTerm + "\uf8ff"),
        orderBy("companyName"),
        limit(20)
      );
    } else {
      q = query(clientsRef, orderBy("companyName"), limit(20));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("取引先データの取得に失敗しました:", error);
    return [];
  }
}

// 備品データの取得
export async function getEquipment(searchTerm = "") {
  try {
    const equipmentRef = collection(db, "equipment");
    let q = equipmentRef;

    if (searchTerm) {
      // 備品名で検索（前方一致）
      q = query(
        equipmentRef,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
        orderBy("name"),
        limit(20)
      );
    } else {
      q = query(equipmentRef, orderBy("name"), limit(20));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("備品データの取得に失敗しました:", error);
    return [];
  }
}

// 単一のドキュメントを取得
export async function getDocumentById(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      console.log("ドキュメントが見つかりません");
      return null;
    }
  } catch (error) {
    console.error("ドキュメントの取得に失敗しました:", error);
    return null;
  }
}

// ドキュメントの追加
export async function addDocument(collectionName, data) {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("ドキュメントの追加に失敗しました:", error);
    throw error;
  }
}

// ドキュメントの更新
export async function updateDocument(collectionName, docId, data) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error("ドキュメントの更新に失敗しました:", error);
    throw error;
  }
}

// ドキュメントの削除
export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("ドキュメントの削除に失敗しました:", error);
    throw error;
  }
}
