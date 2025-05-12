"use client";

import { useState } from 'react';
import styles from './cadastroPizza.module.css';

export default function CadastroPizza () {
    const [activeForm, setActiveForm] = useState('');

    return (
        <div>
            <h1 className={styles.title}>Gerenciamento do catálogo de pizzas</h1>

            <main className={styles.mainContent}>  
                <div className={styles.mainContainer}>
                    <div className={styles.btn}>
                        <button className={styles.btnGreen} type="button" onClick={() => setActiveForm('adicionar')}>Adicionar</button>
                        <button className={styles.btnYellow} type="button"  onClick={() => setActiveForm('editar')}>Editar</button>
                        <button className={styles.btnRed} type="button" onClick={() => setActiveForm('excluir')}>Excluir</button>
                        <button className={styles.btnBlue} type="button" onClick={() => setActiveForm('listar')}>Todas as pizzas</button>
                    </div>

                    <div className={styles.formPizza}>
                        {activeForm === 'adicionar' && (
                        <form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Nome da Pizza:</label>
                                <input type="text" />
                            </div>

                            <div className={styles.formGroup}>
                                <label id="description">Descrição da Pizza:</label>
                                <input type="text" name="" id="description" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="">Valor da Pizza:</label>
                                <input type="text" name="" id="" />
                            </div>

                            <button className={styles.add} type="button">Adicionar produto</button>
                            <button className={styles.cancell} type="button" onClick={() => setActiveForm('')}>Cancelar</button>
                            </form>
                        )}

                        
                        {activeForm === 'editar' && (
                            <div>
                                {/*Precisamos implementar o HTML para edição das pizzas*/ }
                            </div>
                        )}

                        {activeForm === 'excluir' && (
                            <div>
                                {/*Precisamos implementar o HTML para excluir uma pizza especifica*/ }
                            </div>
                        )}

                        {activeForm === 'listar' && (
                            <div>
                                {/*Precisamos implementar o HTML para listat todas as pizzas*/ }
                            </div>
                        )}



                    </div>
                </div>
            </main>
        </div>
    )
}