"use client";

import { useState, useEffect } from 'react';
import styles from './cadastroPizza.module.css';

export default function CadastroPizza() {
    const [activeForm, setActiveForm] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState('');
    const [id, setId] = useState('');
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pizzaEncontrada, setPizzaEncontrada] = useState(false);

    const limparCampos = () => {
        setId('');
        setNome('');
        setDescricao('');
        setValor('');
        setImagem('');
        setPizzaEncontrada(false);
    };

    const handleAddPizza = async () => {
        if (!nome.trim() || !descricao.trim() || !valor || isNaN(parseFloat(valor))) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const novaPizza = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            valor: parseFloat(valor),
            imagem: imagem.trim()
        };

        try {
            setLoading(true);
            const response = await fetch('http://localhost:5098/api/pizzas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaPizza)
            });

            if (response.ok) {
                alert('Pizza adicionada com sucesso!');
                limparCampos();
                setActiveForm('');
                handleGetPizzas();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Erro ao adicionar pizza.');
            }
        } catch (error) {
            console.error('Erro ao adicionar pizza:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    const handleGetPizzas = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5098/api/pizzas');
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const data = await response.json();
            setPizzas(data);
        } catch (error) {
            console.error('Erro ao listar pizzas:', error);
            alert('Erro ao carregar pizzas. Verifique o console.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePizza = async () => {
        if (!id.trim()) {
            alert('Informe o ID da pizza.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5098/api/pizzas/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Pizza excluída com sucesso!');
                limparCampos();
                setActiveForm('');
                handleGetPizzas();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Erro ao excluir pizza.');
            }
        } catch (error) {
            console.error('Erro ao excluir pizza:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    const buscarPizzaPorId = async () => {
        if (!id.trim()) {
            alert('Informe o ID da pizza.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5098/api/pizzas/${id}`);
            if (response.ok) {
                const pizza = await response.json();
                if (pizza) {
                    setNome(pizza.nome);
                    setDescricao(pizza.descricao);
                    setValor(pizza.valor.toString());
                    setImagem(pizza.imagem);
                    setPizzaEncontrada(true);
                } else {
                    alert('Pizza não encontrada!');
                    limparCampos();
                }
            } else if (response.status === 404) {
                alert('Pizza não encontrada!');
                limparCampos();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Erro ao buscar pizza.');
            }
        } catch (error) {
            console.error('Erro ao buscar pizza:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePizza = async () => {
        if (!id.trim() || !nome.trim() || !descricao.trim() || !valor || isNaN(parseFloat(valor))) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const pizzaAtualizada = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            valor: parseFloat(valor),
            imagem: imagem.trim()
        };

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5098/api/pizzas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pizzaAtualizada)
            });

            if (response.ok) {
                alert('Pizza atualizada com sucesso!');
                limparCampos();
                setActiveForm('');
                handleGetPizzas();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Erro ao atualizar pizza.');
            }
        } catch (error) {
            console.error('Erro ao editar pizza:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeForm === 'listar') {
            handleGetPizzas();
        }
    }, [activeForm]);

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

                    <div className={styles.formPizza}>
                        {activeForm === 'adicionar' && (
                            <form className={styles.form}>
                                <div className={styles.formGroup}><label>Nome:</label><input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
                                <div className={styles.formGroup}><label>Descrição:</label><input value={descricao} onChange={(e) => setDescricao(e.target.value)} /></div>
                                <div className={styles.formGroup}><label>Valor:</label><input type="number" value={valor} onChange={(e) => setValor(e.target.value)} /></div>
                                <div className={styles.formGroup}><label>Imagem:</label><input value={imagem} onChange={(e) => setImagem(e.target.value)} /></div>
                                <button className={styles.add} type="button" onClick={handleAddPizza} disabled={loading}>{loading ? 'Processando...' : 'Adicionar produto'}</button>
                                <button className={styles.cancell} type="button" onClick={() => setActiveForm('')} disabled={loading}>Cancelar</button>
                            </form>
                        )}

                        {activeForm === 'editar' && (
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>ID da Pizza:</label>
                                    <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
                                    <button type="button" onClick={buscarPizzaPorId} disabled={!id.trim() || loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
                                </div>
                                {pizzaEncontrada && (
                                    <>
                                        <div className={styles.formGroup}><label>Nome:</label><input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
                                        <div className={styles.formGroup}><label>Descrição:</label><input value={descricao} onChange={(e) => setDescricao(e.target.value)} /></div>
                                        <div className={styles.formGroup}><label>Valor:</label><input type="number" value={valor} onChange={(e) => setValor(e.target.value)} /></div>
                                        <div className={styles.formGroup}><label>Imagem:</label><input value={imagem} onChange={(e) => setImagem(e.target.value)} /></div>
                                        <button className={styles.add} type="button" onClick={handleUpdatePizza} disabled={loading}>{loading ? 'Atualizando...' : 'Atualizar'}</button>
                                    </>
                                )}
                                <button className={styles.cancell} type="button" onClick={() => setActiveForm('')} disabled={loading}>Cancelar</button>
                            </div>
                        )}

                        {activeForm === 'excluir' && (
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>ID da Pizza:</label>
                                    <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
                                </div>
                                <button className={styles.btnRed} onClick={handleDeletePizza} disabled={loading}>{loading ? 'Excluindo...' : 'Excluir'}</button>
                                <button className={styles.cancell} type="button" onClick={() => setActiveForm('')} disabled={loading}>Cancelar</button>
                            </div>
                        )}

                        {activeForm === 'listar' && (
                            <div className={styles.gridCard}>
                                {pizzas.map((pizza) => (
                                    <div key={pizza.id} className={styles.card}>
                                        <img className={styles.img} src={pizza.imagem} alt={pizza.nome} />
                                        <div className={styles.cardInfo}>
                                            <p>ID: {pizza.id}</p>
                                            <h3>{pizza.nome}</h3>
                                            <p>{pizza.descricao}</p>
                                            <p>R$ {pizza.valor.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
