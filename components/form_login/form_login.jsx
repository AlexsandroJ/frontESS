import { useEffect, useState, useRef } from 'react';
import './form_login.css';

export default function FormLogin() {

    const urlApi = process.env.NEXT_PUBLIC_API_URL;

    const [showSvgEmail, setShowSvgEmail] = useState(false);
    const [showSvgPassword, setShowSvgPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('a');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const btn_entrar = useRef(null);

    useEffect(() => {
        if (email !== '' && password !== '') {
            btn_entrar.current.disabled = false;
        }
        else {
            btn_entrar.current.disabled = true;
        }
    }, [email, password]);

    const svgCode_email = `
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 41C31.8218 41 41 31.8218 41 20.5C41 9.17816 31.8218 0 20.5 0C9.17816 0 0 9.17816 0 20.5C0 31.8218 9.17816 41 20.5 41Z" fill="#FD0808"/>
            <path d="M23.451 33C24.4342 33 25.2313 32.2029 25.2313 31.2197C25.2313 30.2365 24.4342 29.4394 23.451 29.4394C22.4677 29.4394 21.6707 30.2365 21.6707 31.2197C21.6707 32.2029 22.4677 33 23.451 33Z" fill="white"/>
            <path d="M23.4434 9.22762C23.2799 10.3143 23.5729 10.5417 23.5745 15.2265C23.5761 19.9114 24.5482 26.1926 23.4493 26.1929C22.3504 26.1933 21.9485 13.2303 18.1326 12.083C13.6461 10.7341 23.9728 5.70983 23.4434 9.22762Z" fill="white"/>
        </svg>
    `;
    const svgCode_password = svgCode_email;

    return ( 
        <div id="container">
            <div id="title">
                <h1>LOGIN</h1>
            </div>
            <div id="enter">
                <form id="form">
                    <div className="email">
                        <label htmlFor="e-mail" className="label">e-mail</label>
                        <input type="text" name="e-mail" id="e-mail" placeholder="" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        {showSvgEmail && <div id='email-incorrect' dangerouslySetInnerHTML={{ __html: svgCode_email }} />}
                    </div>

                    <div className="senha">
                        <label htmlFor="password" className="label">senha</label>
                        <input type="password" name="password" id="password" placeholder="" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {showSvgPassword && <div id='password-incorrect' dangerouslySetInnerHTML={{ __html: svgCode_password }} />}
                    </div>

                    <p id='message' className="error-message">{errorMessage}</p>
                    <button id="ent" ref={btn_entrar}disabled>ENTRAR</button>
                </form>
            </div>
        </div>
    );
}
