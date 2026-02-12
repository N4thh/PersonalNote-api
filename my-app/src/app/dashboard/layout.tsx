import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">

      {/* HEADER */}
      <header className="bg-[#F8F8F8] border-b border-gray-200 px-8 py-8">
        <h1 className="font-semibold text-2xl">Notely</h1>
      </header>

      {/* MAIN */}
      <main className="flex-1 bg-[#F5F8FF]">
        <div className="max-w-[92rem] mx-auto px-4 sm:px-6 md:px-8 py-10">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#F8F8F8] border-t border-gray-200 px-20 py-6 text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-lg">
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
