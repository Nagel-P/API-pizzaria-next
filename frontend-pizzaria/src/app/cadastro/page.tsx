"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o router do Next.js 13+
import styles from './cadastro.module.css';

export default function CadastroPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita refresh da página

    const res = await fetch("http://localhost:5098/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Usuário cadastrado com sucesso!");
      router.push('/login'); // Redireciona para a página de login
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className={styles.registerMain}>
      <div className={styles.card}>
        <h2 className={styles.title}>Cadastro do usuário</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input name="nome" placeholder="Nome" className={styles.input} onChange={handleChange} value={form.nome} />
          <input name="cpf" placeholder="CPF" className={styles.input} onChange={handleChange} value={form.cpf} />
          <input name="email" placeholder="Email" className={styles.input} onChange={handleChange} value={form.email} />
          <input name="telefone" placeholder="Telefone" className={styles.input} onChange={handleChange} value={form.telefone} />
          <input name="senha" type="password" placeholder="Senha" className={styles.input} onChange={handleChange} value={form.senha} />
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
