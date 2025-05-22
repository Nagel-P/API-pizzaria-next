import Header from '../components/Header'; 

export const metadata = {
  title: 'Pizzaria Next.js',
  description: 'Sistema de pedidos de pizzaria',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head />
      <body>
        <Header />
        {children}
        <footer>
          <p>© 2025 Pizzaria</p>
        </footer>
      </body>
    </html>
  )
}
