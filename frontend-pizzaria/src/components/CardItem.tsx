// src/components/CardItem.tsx
type CardItemProps = {
    nome: string;
    descricao: string;
    preco: number;
    onAdicionar?: () => void;
  };
  
  export default function CardItem({ nome, descricao, preco, onAdicionar }: CardItemProps) {
    return (
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <h2 className="text-lg font-bold">{nome}</h2>
        <p className="text-sm text-gray-600">{descricao}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-semibold text-red-600">R$ {preco.toFixed(2)}</span>
          <button
            onClick={onAdicionar}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Adicionar
          </button>
        </div>
      </div>
    );
  }
  