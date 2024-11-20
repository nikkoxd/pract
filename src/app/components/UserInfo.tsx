"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserInfo({ session }: { session: Session | null }) {
  return (
    <>
      {session ?
        <div className="flex items-center gap-2">
          <p>{session.user?.email}</p>
          <button onClick={() => signOut()} className="text-blue-500 hover:underline">Выйти</button>
        </div>
        :
        <Link href="/signin" className="text-blue-500 hover:underline">Войти</Link>
      }
    </>
  )
}
