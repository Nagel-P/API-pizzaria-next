import styles from '../app/cardapio/cardapio.module.css';

type CardItemProps = {
  nome: string;
  descricao: string;
  preco: number;
  onAdicionar?: () => void;
};

export default function CardItem({ nome, descricao, preco, onAdicionar }: CardItemProps) {
  return (
    <div className={styles.cardItem}>
      <div className={styles.imgCard}>
        <img src="/images/pizza.jpg" alt={nome} />
      </div>

      <div className={styles.infoCard}>
        <h2 className={styles.nome}>{nome}</h2>
        <p className={styles.descricao}>{descricao}</p>
        <span className={styles.preco}>R$ {preco.toFixed(2)}</span>
        <button onClick={onAdicionar} className={styles.btnAddPizza}>
          ADICIONAR AO CARRINHO
        </button>
      </div>
    </div>
  );
}
