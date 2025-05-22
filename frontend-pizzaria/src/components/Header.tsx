import Image from "next/image";
import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <div className={styles.logo}>
            <Image src="/images/logo.png" alt="Logo da pizzaria" width={120} height={120} />
          </div>

          <nav className={styles.navbar}>
            <a href="/cardapio">Cardapio</a>
            <a href="/login">Login</a>
            <a href="/cadastro">Cadastro</a>
            <a href="/carrinho">Carrinho</a>
            <a href="/cadastroPizza">Administrador</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
