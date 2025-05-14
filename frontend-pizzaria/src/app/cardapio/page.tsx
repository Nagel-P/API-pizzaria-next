// src/app/cardapio/page.tsx
"use client";

import { useEffect, useState } from "react";
import CardItem from "@/components/CardItem"; // ajuste o path se necessário

type Pizza = {
  id: number;
  nome: string;
  preco: number;
  imagemUrl: string;
};

export default function CardapioPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const response = await fetch("http://localhost:5098/api/pizzas");
        if (!response.ok) throw new Error("Erro ao buscar pizzas");

        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Erro ao buscar pizzas:", error);
      }
    }

    fetchPizzas();
  }, []);

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nosso Cardápio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <CardItem
            key={pizza.id}
            nome={pizza.nome}
            descricao={`Deliciosa pizza ${pizza.nome}`} // pode ajustar conforme quiser
            preco={Number(pizza.preco)}
            onAdicionar={() => alert(`Pizza ${pizza.nome} adicionada!`)}
          />
        ))}
      </div>
    </main>
  );
}
