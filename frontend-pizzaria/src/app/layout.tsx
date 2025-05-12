// app/layout.tsx

import Image from "next/image";
import styles from './cadastroPizza/cadastroPizza.module.css'

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
                <div className={styles.container}>
                    <div className={styles.containerHeader}>
                        <div className={styles.logo}>
                            <Image src="/images/logo.png" alt="Logo da pizzaria" width={120} height={120}  />
                        </div>

                        <div className={styles.navbar}>
                            <a href="http://localhost:3000/">Home</a>
                            <a href="http://localhost:3000/cardapio">Cardapio</a>
                            <a href="http://localhost:3000/login">Login</a>
                            <a href="http://localhost:3000/cadastro">Cadastro</a>
                            <a href="http://localhost:3000/cadastroPizza">Administrador</a>
                        </div>
                    </div>
                </div>
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
