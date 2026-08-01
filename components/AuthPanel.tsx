"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export default function AuthPanel({
  onSessionChange,
}: {
  onSessionChange?: (session: Session | null) => void;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      onSessionChange?.(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      onSessionChange?.(newSession);
    });

    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSignup() {
    if (!agreed) {
      setMessage("개인정보 수집·이용에 동의해주세요.");
      return;
    }
    setMessage("");
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : "가입 완료! 이메일 인증 후 로그인해주세요.");
  }

  async function handleLogin() {
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (session) {
    return (
      <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
        <span>{session.user.email}님 환영합니다</span>
        <button
          onClick={handleLogout}
          className="rounded-full border border-zinc-300 px-3 py-1 text-xs hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm text-zinc-900 outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm text-zinc-900 outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
        />
      </div>
      <label className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-3.5 w-3.5"
        />
        <span>
          (회원가입 시 필수)&nbsp;
          <Link href="/privacy" target="_blank" className="underline hover:text-zinc-700 dark:hover:text-zinc-200">
            개인정보처리방침
          </Link>
          에 동의합니다
        </span>
      </label>
      <div className="flex gap-2 text-sm">
        <button
          onClick={handleLogin}
          className="rounded-full bg-zinc-900 px-4 py-1.5 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          로그인
        </button>
        <button
          onClick={handleSignup}
          className="rounded-full border border-zinc-300 px-4 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          회원가입
        </button>
      </div>
      {message && <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>}
    </div>
  );
}
