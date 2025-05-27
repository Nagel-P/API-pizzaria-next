"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const senha = form.senha.trim();

    const res = await fetch("http://localhost:5098/api/clientes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ id: data.id, nome: data.nome, email: data.email }));
      alert(`Bem-vindo, ${data.nome}!`);
      router.push("/cardapio");
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div className={styles.loginMain}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            name="email"
            placeholder="Email"
            className={styles.input}
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            className={styles.input}
            value={form.senha}
            onChange={handleChange}
          />
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
