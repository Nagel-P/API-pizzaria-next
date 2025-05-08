// src/components/Botao.tsx
type BotaoProps = {
    texto: string;
    onClick?: () => void;
    tipo?: 'button' | 'submit';
    cor?: 'vermelho' | 'cinza';
  };
  
  export default function Botao({ texto, onClick, tipo = 'button', cor = 'vermelho' }: BotaoProps) {
    const cores = {
      vermelho: 'bg-red-600 hover:bg-red-700 text-white',
      cinza: 'bg-gray-300 hover:bg-gray-400 text-black',
    };
  
    return (
      <button
        type={tipo}
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-medium transition ${cores[cor]}`}
      >
        {texto}
      </button>
    );
  }
  