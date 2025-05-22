'use client';

import React, { createContext, useContext, useState } from 'react';

export type Pizza = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
};

type ItemCarrinho = {
  pizza: Pizza;
  quantidade: number;
};

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionarPizza: (pizza: Pizza) => void;
  removerPizza: (id: number) => void;
  alterarQuantidade: (id: number, quantidade: number) => void;
  limparCarrinho: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: React.ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarPizza = (pizza: Pizza) => {
    setItens(prev => {
      const existente = prev.find(item => item.pizza.id === pizza.id);
      if (existente) {
        return prev.map(item =>
          item.pizza.id === pizza.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { pizza, quantidade: 1 }];
    });
  };

  const removerPizza = (id: number) => {
    setItens(prev => prev.filter(item => item.pizza.id !== id));
  };

  const alterarQuantidade = (id: number, quantidade: number) => {
    if (quantidade <= 0) return removerPizza(id);
    setItens(prev =>
      prev.map(item =>
        item.pizza.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const limparCarrinho = () => setItens([]);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarPizza, removerPizza, alterarQuantidade, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error('useCarrinho must be used within CarrinhoProvider');
  return context;
};
