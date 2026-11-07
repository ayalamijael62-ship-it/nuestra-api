import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexto/AuthContext';

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setCargando(true);

    const { error } = await iniciarSesion(email, password);

    setCargando(false);

    if (error) {
      setError('El correo electrónico o la contraseña son incorrectos.');
      return;
    }

    navigate('/');
  }

  return (
    <main className="auth">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p>
        ¿Todavía no tenés una cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </main>
  );
}

export default Login;