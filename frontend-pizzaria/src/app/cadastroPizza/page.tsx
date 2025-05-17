'use client';

import { useState, useEffect } from 'react';
import styles from './cadastroPizza.module.css';

type Pizza = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl: string;
};

const API_URL = 'http://localhost:5098/api/pizzas';

export default function CadastroPizza() {
    const [activeForm, setActiveForm] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState('');
    const [id, setId] = useState('');
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [loading, setLoading] = useState(false);
    const [pizzaEncontrada, setPizzaEncontrada] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const limparCampos = () => {
        setId('');
        setNome('');
        setDescricao('');
        setValor('');
        setImagem('');
        setPizzaEncontrada(false);
        setError(null);
    };

    const validarCampos = () => {
        if (!nome.trim() || !descricao.trim() || !valor || isNaN(Number(valor))) {
            setError('Preencha todos os campos corretamente.');
            return false;
        }
        return true;
    };

    const handleAddPizza = async () => {
        if (!validarCampos()) return;

        const novaPizza = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: parseFloat(valor),
            imagemUrl: imagem.trim()
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaPizza)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }

            alert('Pizza adicionada com sucesso!');
            limparCampos();
            setActiveForm('');
            await handleGetPizzas();
        } catch (err: any) {
            alert(err?.message || 'Erro ao adicionar pizza.');
        }
    };

    const handleGetPizzas = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setPizzas(data);
        } catch (err) {
            console.error(err);
        }
    };

    const buscarPizzaPorId = async () => {
        if (!id.trim()) {
            alert('Informe o ID da pizza.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error(await response.text());

            const pizza = await response.json();
            setNome(pizza.nome);
            setDescricao(pizza.descricao);
            setValor(pizza.preco.toString());
            setImagem(pizza.imagemUrl);
            setPizzaEncontrada(true);
        } catch (err: any) {
            alert(err.message.includes('404') ? 'Pizza não encontrada.' : err.message);
            limparCampos();
        }
    };

    const handleUpdatePizza = async () => {
        if (!id.trim() || !validarCampos()) return;

        const pizzaAtualizada = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: parseFloat(valor),
            imagemUrl: imagem.trim()
        };

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pizzaAtualizada)
            });

            if (!response.ok) throw new Error(await response.text());

            alert('Pizza atualizada com sucesso!');
            limparCampos();
            setActiveForm('');
            await handleGetPizzas();
        } catch (err: any) {
            alert(err.message || 'Erro ao atualizar pizza.');
        }
    };

    const handleDeletePizza = async () => {
        if (!id.trim()) return alert('Informe o ID da pizza.');

        if (!confirm('Tem certeza que deseja excluir esta pizza?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(await response.text());

            alert('Pizza excluída com sucesso!');
            limparCampos();
            setActiveForm('');
            await handleGetPizzas();
        } catch (err: any) {
            alert(err.message || 'Erro ao excluir pizza.');
        }
    };

    useEffect(() => {
        handleGetPizzas();
    }, []);


    return (
        <div>
            <h1 className={styles.title}>Gerenciamento do catálogo de pizzas</h1>
            <main className={styles.mainContent}>
                <div className={styles.mainContainer}>
                    <div className={styles.btn}>
                        <button className={styles.btnGreen} onClick={() => { limparCampos(); setActiveForm('adicionar'); }}>Adicionar</button>
                        <button className={styles.btnYellow} onClick={() => { limparCampos(); setActiveForm('editar'); }}>Editar</button>
                        <button className={styles.btnRed} onClick={() => { limparCampos(); setActiveForm('excluir'); }}>Excluir</button>
                        <button className={styles.btnBlue} onClick={() => { limparCampos(); setActiveForm('listar'); }}>Todas as pizzas</button>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.formPizza}>
                        {activeForm === 'adicionar' && (
                            <form className={styles.form}>
                                <div className={styles.formGroup}><label>Nome:</label><input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
                                <div className={styles.formGroup}><label>Descrição:</label><input value={descricao} onChange={(e) => setDescricao(e.target.value)} /></div>
                                <div className={styles.formGroup}><label>Valor:</label><input type="number" value={valor} onChange={(e) => setValor(e.target.value)} /></div>
                                <div className={styles.formGroup}><label>Imagem:</label><input value={imagem} onChange={(e) => setImagem(e.target.value)} /></div>
                                <button className={styles.add} type="button" onClick={handleAddPizza} disabled={loading}>
                                    {loading ? 'Processando...' : 'Adicionar produto'}
                                </button>
                                <button className={styles.cancell} type="button" onClick={() => setActiveForm('')} disabled={loading}>Cancelar</button>
                            </form>
                        )}

                        {activeForm === 'editar' && (
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>ID da Pizza:</label>
                                    <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
                                    <button type="button" onClick={buscarPizzaPorId} disabled={loading || !id}>Buscar</button>
                                </div>
                                {pizzaEncontrada && (
                                    <>
                                        <div className={styles.formGroup}><label>Nome:</label><input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
                                        <div className={styles.formGroup}><label>Descrição:</label><input value={descricao} onChange={(e) => setDescricao(e.target.value)} /></div>
                                        <div className={styles.formGroup}><label>Valor:</label><input type="number" value={valor} onChange={(e) => setValor(e.target.value)} /></div>
                                        <div className={styles.formGroup}><label>Imagem:</label><input value={imagem} onChange={(e) => setImagem(e.target.value)} /></div>
                                        <button className={styles.add} onClick={handleUpdatePizza} disabled={loading}>
                                            {loading ? 'Atualizando...' : 'Atualizar'}
                                        </button>
                                    </>
                                )}
                                <button className={styles.cancell} onClick={() => setActiveForm('')} disabled={loading}>Cancelar</button>
                            </div>
                        )}

                        {activeForm === 'excluir' && (
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>ID da Pizza:</label>
                                    <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
                                </div>
                                <button className={styles.btnRed} onClick={handleDeletePizza} disabled={loading}>
                                    {loading ? 'Excluindo...' : 'Excluir'}
                                </button>
                                <button className={styles.cancell} onClick={() => setActiveForm('')} disabled={loading}>Cancelar</button>
                            </div>
                        )}

                        {activeForm === 'listar' && (
                            <div className={styles.gridCard}>
                                {pizzas.length === 0 ? (
                                    <p>Nenhuma pizza cadastrada.</p>
                                ) : (
                                    pizzas.map((pizza) => (
                                        <div key={pizza.id} className={styles.card}>
                                            <img className={styles.img} src={pizza.imagemUrl} alt={pizza.nome} />
                                            <div className={styles.cardInfo}>
                                                <p>ID: {pizza.id}</p>
                                                <h3>{pizza.nome}</h3>
                                                <p>{pizza.descricao}</p>
                                                <p>R$ {pizza.preco.toFixed(2)}</p>  // Campo mudou para 'preco'
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}