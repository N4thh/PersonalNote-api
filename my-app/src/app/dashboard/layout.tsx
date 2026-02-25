'use client'
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open,setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isHome = pathname === "/dashboard";
  const isNotePage = pathname.startsWith("/dashboard/notes");
  const handleLogout = async () => {
      setIsLoggingOut(true);

      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST',
        });

        if (!res.ok) {
          throw new Error('Logout failed');
        }

        router.push('/login');
        router.refresh();
      } catch (error) {
        console.error('Logout error:', error);
        setIsLoggingOut(false);
      }
    };
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">

      {/* HEADER */}
      <header className="border-b border-gray-200 px-8 py-8 font-semibold flex justify-between">
        <div className="flex space-x-5 items-center" >
          <h1 className=" text-2xl">Notely</h1>
        
          <Link href="/dashboard"
          className={`border rounded-lg py-2 px-4 ${isHome ? "bg-black text-white" : "bg-white text-black"}`}
          >Home</Link>
          
          <Link href="/dashboard/notes"
          className={`border rounded-lg py-2 px-4 ${isNotePage ? "bg-black text-white" : "bg-white text-black"}`}
          >Create Note</Link>
        </div>
        <div className="relative inline-block items-center">
          <button
            className="w-10 h-10  rounded-full bg-gray-200 flex items-center justify-center"
            onClick={() => setOpen(prev => !prev)}
          >
           <User size ={25}/>
          </button>

          {open && (
            <div className="absolute right-1 mt-2 w-48 rounded-xl shadow-lg border p-2 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 ">
              <button onClick={handleLogout}
               className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-gray-200 transition">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>      
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
