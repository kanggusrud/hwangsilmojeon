import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(list);
    };
    loadUsers();
  }, []);

  const approve = async (id) => {
    await updateDoc(doc(db, "users", id), { approved: true });
    setUsers(prev => prev.map(u => u.id === id ? { ...u, approved: true } : u));
  };

  return (
    <div>
      <h2>관리자 페이지</h2>
      {users.map(u => (
        <div key={u.id}>
          {u.email} - {u.approved ? "승인됨" : "승인대기중"}
          {!u.approved && <button onClick={() => approve(u.id)}>승인</button>}
        </div>
      ))}
    </div>
  );
}
