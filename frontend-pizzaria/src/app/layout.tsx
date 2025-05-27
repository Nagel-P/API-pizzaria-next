import Header from '../components/Header'; 
import Footer from '@/components/Footer';
import { CarrinhoProvider } from '../context/carrinhoContext';


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
        <CarrinhoProvider>
          {children}
        </CarrinhoProvider>
        <Footer/>
      </body>
    </html>
  )
}
