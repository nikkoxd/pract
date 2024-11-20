"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="text-blue-500 hover:underline">Выйти</button>
  )
}
