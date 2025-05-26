"use client";

import { useEffect, useState } from "react";
import CardItem from "@/components/CardItem";
import styles from './cardapio.module.css';
import { useCarrinho } from "@/context/carrinhoContext";

type Pizza = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
};

export default function CardapioPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const { adicionarPizza } = useCarrinho();

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
    <main className={styles.containerCardapio}>
      <h2 className={styles.titulo}>NOSSO CARDÁPIO</h2>

      <div className={styles.gridCardapio}>
        {pizzas.map((pizza) => (
          <CardItem
            key={pizza.id}
            nome={pizza.nome}
            descricao={pizza.descricao}
            preco={Number(pizza.preco)}
            onAdicionar={() => adicionarPizza(pizza)}
          />
        ))}
      </div>
    </main>
  );
}
