'use client';

import { useCarrinho } from '../../context/carrinhoContext';
import axios from 'axios';

export default function CarrinhoPage() {
  const { itens, alterarQuantidade, removerPizza, limparCarrinho } = useCarrinho();

  const total = itens.reduce((soma, item) => soma + item.pizza.preco * item.quantidade, 0);

  const finalizarPedido = async () => {
    try {
      await axios.post('http://localhost:5098/api/pedido/finalizar', {
        clienteId: 1, // Troque isso para pegar dinamicamente do JWT ou contexto
        pizzas: itens.map(i => i.pizza),
      });
      alert('Pedido realizado com sucesso!');
      limparCarrinho();
    } catch (error) {
      console.error(error);
      alert('Erro ao finalizar pedido');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>

      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {itens.map(item => (
              <li key={item.pizza.id} className="mb-4 border-b pb-2">
                <div className="flex justify-between">
                  <span>{item.pizza.nome}</span>
                  <span>R$ {item.pizza.preco.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => alterarQuantidade(item.pizza.id, item.quantidade - 1)}>-</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => alterarQuantidade(item.pizza.id, item.quantidade + 1)}>+</button>
                  <button onClick={() => removerPizza(item.pizza.id)} className="text-red-500 ml-4">Remover</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-lg">Total: <strong>R$ {total.toFixed(2)}</strong></p>
            <button onClick={finalizarPedido} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}
