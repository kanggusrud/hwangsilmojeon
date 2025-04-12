import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists() && userDoc.data().approved) {
        setMsg("로그인 성공! 환영합니다.");
      } else {
        setMsg("아직 관리자의 승인이 필요합니다.");
      }
    } catch (err) {
      setMsg("로그인 실패: " + err.message);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input type="email" placeholder="이메일" onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>로그인</button>
      <p>{msg}</p>
    </div>
  );
}
