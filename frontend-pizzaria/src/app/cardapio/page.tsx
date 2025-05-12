  // src/app/cardapio/page.tsx
  "use client";

  import CardItem from "@/components/CardItem";

  export default function CardapioPage() {
    return (
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Nosso Cardápio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardItem nome="Pizza Margherita" descricao="Molho, mussarela e manjericão" preco={39.9} />
          <CardItem nome="Pizza Calabresa" descricao="Calabresa, cebola e queijo" preco={42.5} />
          <CardItem nome="Pizza Quatro Queijos" descricao="Mussarela, parmesão, gorgonzola e catupiry" preco={45.0} />
        </div>
      </main>
    );
  }
