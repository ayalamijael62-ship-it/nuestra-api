import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexto/AuthContext';

function Registro() {
  const { registrarse } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setMensaje('');
    setCargando(true);

    const { data, error } = await registrarse(email, password);

    setCargando(false);

    if (error) {
      setError(error.message);
      return;
    }

    //si Supabase devuelve una sesión, el usuario ya está autenticado.
    if (data.session) {
      navigate('/');
    } else {
      //si está activada la confirmación por email, deberá verificarlo.
      setMensaje(
        'Cuenta creada. Revisá tu correo electrónico para confirmar el registro.'
      );
    }
  }

  return (
    <main className="auth">
      <h1>Crear cuenta</h1>

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
            minLength={6}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}
        {mensaje && <p className="auth-message">{mensaje}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>

      <p>
        ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </main>
  );
}

export default Registro;