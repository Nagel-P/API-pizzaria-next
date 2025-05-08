// app/layout.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Pizzaria Next.js',
  description: 'Sistema de pedidos de pizzaria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Pode incluir seu favicon e outras configurações */}
      </head>
      <body>
        <header>
          <nav>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/cardapio">Cardápio</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/cadastro">Cadastro</Link></li>
            </ul>
          </nav>
        </header>

        {/* Conteúdo das páginas será renderizado aqui */}
        {children}

        <footer>
          <p>© 2025 Pizzaria</p>
        </footer>
      </body>
    </html>
  )
}
