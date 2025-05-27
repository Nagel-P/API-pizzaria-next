// src/components/Footer.tsx
import styles from "./footer.module.css"

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <p className={styles.footerName}>
          © {new Date().getFullYear()} Doublepizzas pizzaria. Todos os direitos reservados.
        </p>
      </footer>
    );
  }
  