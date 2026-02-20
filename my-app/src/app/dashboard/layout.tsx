'use client'
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function DashboardLayout({ children }: { children: ReactNode }) {
     const pathname = usePathname();

  const isHome = pathname === "/dashboard";
  const isNotePage = pathname.startsWith("/dashboard/notes");

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">

      {/* HEADER */}
      <header className="border-b border-gray-200 px-8 py-8  space-x-4 font-semibold flex items-center">
        <h1 className=" text-2xl">Notely</h1>
        
       <Link href="/dashboard"
        className={`border rounded-lg py-2 px-4 ${isHome ? "bg-black text-white" : "bg-white text-black"}`}       
        >Home</Link>
        
      <Link href="/dashboard/notes"
        className={`border rounded-lg py-2 px-4 ${isNotePage ? "bg-black text-white" : "bg-white text-black"}`}       
        >Create Note</Link>
             
      </header>

      {/* MAIN */}
      <main className="flex-1 ">
        <div className="max-w-[92rem] mx-auto px-4 sm:px-6 md:px-8 py-10">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 px-20 py-6 text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          <p>2026 Notely. Build with React & Tailwind CSS</p>

          <a
            href="https://github.com/N4thh/PersonalNote-api"
            className="hover:text-gray-600"
            target="_blank"
          > View on GitHub</a>
        </div>

        <p className="text-center mt-3 text-sm">
          A portfolio project demonstrating modern web development practices.
        </p>
      </footer>

    </div>
  );
}
