"use client";

import { useState } from "react";

export default function CadastroPage() {
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

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5098/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      alert("Usuário cadastrado com sucesso!");
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>
      <input name="nome" placeholder="Nome" className="block mb-2 border p-2" onChange={handleChange} />
      <input name="cpf" placeholder="CPF" className="block mb-2 border p-2" onChange={handleChange} />
      <input name="email" placeholder="Email" className="block mb-2 border p-2" onChange={handleChange} />
      <input name="telefone" placeholder="Telefone" className="block mb-2 border p-2" onChange={handleChange} />
      <input name="senha" type="password" placeholder="Senha" className="block mb-4 border p-2" onChange={handleChange} />
      <button onClick={handleSubmit} className="bg-red-600 text-white px-4 py-2 rounded">Cadastrar</button>
    </div>
  );
}
