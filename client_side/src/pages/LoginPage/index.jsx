import React, { useState, useContext } from "react";
import Toast from 'react-bootstrap/Toast';
import WarningIcon from '@mui/icons-material/Warning';
import logoSis from '../../assets/image/logo-agendacras-white.png';
import logoSDHDS from '../../assets/image/logo-sdhds-white.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { AuthContext } from '../../contexts/auth';

const LoginPage = () => {
    const {login } = useContext(AuthContext);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [show, setShow] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log('submit', { usuario, senha });
        login(usuario, senha);
        setShow(true);
        //console.log();
    }


    return (
        <div id="login">
            <img src={logoSDHDS} alt="Logo" width="120" height="170" />
            <img src={logoSis} alt="Logo" width="300" height="50" />
            <h5 className="text-warning"><em>Módulo de Chamada</em></h5>
           

            {/* {status.type === 'error' ? <Alert severity="error">
            <AlertTitle><strong>{status.mensagem}</strong></AlertTitle>
          </Alert> : ""}

          {status.type === 'success' ? <Alert severity="success">
            <AlertTitle><strong>{status.mensagem}</strong></AlertTitle>
          </Alert> : ""}

           {status.type === 'success' ? <Redirect to={{
            pathname: "/home",
          }}/> : ""}
 */}
           
                <Toast className="m-1" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header closeButton={false} className='bg-danger text-white'>
                        <WarningIcon/>
                        <strong className="me-auto">&emsp;Erro ao efetuar login!</strong>
                        
                    </Toast.Header>
                    <Toast.Body className='bg-danger text-white'><strong className="me-auto">Ops! Verifique o usuário e a senha.</strong></Toast.Body>
                </Toast>
            

            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="form-label" htmlFor="usuario"><strong className="text-light">Usuário</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        name="usuario"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="senha"><strong className="text-light">Senha</strong></label>
                    <input
                        type="password"
                        className="form-control"
                        name="senha"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;