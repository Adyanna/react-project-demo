import { useState } from "react";
import style from './login-form.module.css';

interface Props {
  onLogin: (username: string, password: string,remember:boolean) => void;
  error?:string;
}

export const LoginForm = ({ onLogin,error }: Props) => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password,remember);
  };

  return (
    <div className={style.loginContainer}>
    <form  className={style.loginForm} onSubmit={handleSubmit}>
      <h2 className={style.title}>Login</h2>
        {error && (<p className={style.error}>{error}</p>)}
      <input  className={style.input}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input  className={style.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className={style.checkbox}>
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        Recordar sesión
      </label>

      <button className={style.button} type="submit">Entrar</button>
    </form>
    </div>
  );
};