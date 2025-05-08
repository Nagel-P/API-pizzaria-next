"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const res = await fetch("https://localhost:5098/api/clientes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token); // Salva o token
      localStorage.setItem("user", JSON.stringify({ id: data.id, nome: data.nome, email: data.email }));
      alert(`Bem-vindo, ${data.nome}!`);
      router.push("/dashboard"); // Redireciona para uma página protegida
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input name="email" placeholder="Email" className="block mb-2 border p-2" onChange={handleChange} />
      <input name="senha" type="password" placeholder="Senha" className="block mb-4 border p-2" onChange={handleChange} />
      <button onClick={handleLogin} className="bg-red-600 text-white px-4 py-2 rounded">Entrar</button>
    </div>
  );
}
