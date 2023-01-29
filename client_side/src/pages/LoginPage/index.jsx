import React, { useState, useContext } from "react";

import './styles.css';

import { AuthContext } from '../../contexts/auth';

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [status, setStatus] = useState({
    type: '',
    mensagem: '',
    loading: false
  });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit', {usuario, senha});
        login(usuario, senha);
    }


    return (
        <div id="login">
            <h1 className="title">Login do Sistema</h1>
            <p>{String(authenticated)}</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="usuario">Usuario</label>
                    <input 
                        type="text" 
                        name="usuario" 
                        id="usuario" 
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)} 
                    />
                </div>
                <div className="field">
                    <label htmlFor="senha">Senha</label>
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;