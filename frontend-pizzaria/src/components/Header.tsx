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
            <a href="/cardapio">CARDAPIO</a>
            <a href="/login">LOGIN</a>
            <a href="/cadastro">CADASTRO</a>
            <a href="/carrinho">CARRINHO</a>
            <a href="/cadastroPizza">ADMINISTRADOR</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
