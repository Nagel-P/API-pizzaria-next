// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">doublepizzas</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="/cardapio" className="hover:underline">Cardápio</Link>
          <Link href="/login" className="hover:underline">Login</Link>
        </nav>
      </div>
    </header>
  );
}
