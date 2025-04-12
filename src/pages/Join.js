import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleJoin = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        approved: false,
        createdAt: new Date()
      });
      setMsg("가입 요청이 완료되었습니다. 관리자의 승인을 기다려주세요.");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input type="email" placeholder="이메일" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleJoin}>가입 요청</button>
      <p>{msg}</p>
    </div>
  );
}
