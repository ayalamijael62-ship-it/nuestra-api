
import { useEffect, useRef, useState } from 'react';

function Buscador({ busqueda, setBusqueda, alBuscar, cargando }) {
  const [escuchando, setEscuchando] = useState(false);
  const [errorVoz, setErrorVoz] = useState('');
  const reconocimientoRef = useRef(null);

  function iniciarReconocimiento() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorVoz('Tu navegador no admite la búsqueda por voz.');
      return;
    }

    setErrorVoz('');

    const reconocimiento = new SpeechRecognition();

    reconocimiento.lang = 'es-AR';
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onstart = () => {
      setEscuchando(true);
    };

    reconocimiento.onresult = (evento) => {
      const textoReconocido =
        evento.results[0][0].transcript.trim();

      if (textoReconocido) {
        setBusqueda(textoReconocido);
        alBuscar(null, textoReconocido);
      }
    };

    reconocimiento.onerror = (evento) => {
      switch (evento.error) {
        case 'not-allowed':
        case 'service-not-allowed':
          setErrorVoz('No se concedió permiso para utilizar el micrófono.');
          break;

        case 'audio-capture':
          setErrorVoz('No se encontró un micrófono disponible.');
          break;

        case 'no-speech':
          setErrorVoz('No se detectó ninguna voz. Intentá nuevamente.');
          break;

        case 'network':
          setErrorVoz('Hubo un problema de conexión durante el reconocimiento.');
          break;

        default:
          setErrorVoz('No se pudo reconocer tu voz. Intentá nuevamente.');
      }
    };

    reconocimiento.onend = () => {
      setEscuchando(false);
      reconocimientoRef.current = null;
    };

    reconocimientoRef.current = reconocimiento;

    try {
      reconocimiento.start();
    } catch {
      setEscuchando(false);
      setErrorVoz('No se pudo iniciar el reconocimiento de voz.');
      reconocimientoRef.current = null;
    }
  }

  function detenerReconocimiento() {
    reconocimientoRef.current?.stop();
  }

  useEffect(() => {
    return () => {
      reconocimientoRef.current?.abort();
    };
  }, []);

  return (
    <section className="buscador">
      <h2>¿Qué querés ver hoy?</h2>

      <form onSubmit={alBuscar}>
        <input
          type="search"
          placeholder="Buscar películas o series..."
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          aria-label="Buscar películas o series"
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>

        <button
          type="button"
          onClick={
            escuchando
              ? detenerReconocimiento
              : iniciarReconocimiento
          }
          disabled={cargando}
          aria-label={
            escuchando
              ? 'Detener reconocimiento de voz'
              : 'Buscar mediante voz'
          }
          aria-pressed={escuchando}
        >
          {escuchando ? 'Detener' : '🎙️'}
        </button>
      </form>

      {escuchando && (
        <p role="status">Escuchando... Hablá ahora.</p>
      )}

      {errorVoz && (
        <p role="alert">{errorVoz}</p>
      )}
    </section>
  );
}

export default Buscador;

