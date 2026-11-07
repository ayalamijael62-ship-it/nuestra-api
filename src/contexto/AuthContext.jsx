//Importamos las librerias de react que usaremos y el cliente de supabase
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/cliente';

//creamos el contexto
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    //creamos los estados
    const [usuario, setUsuario] = useState(null); //Almacena datos de la sesion cargada
    const [cargando, setCargando] = useState(true); //Indica si estamos comprobando el estado de auntenticación

    //comprobar la sesión y escuchar cambios de autenticación
    useEffect(() => {
        const {
        data: { subscription },
        } = supabase.auth.onAuthStateChange((evento, session) => { //permite escuchar los cambios que ocurren en el estado de autenticación.
        setUsuario(session?.user ?? null); //Si existe una sesión, guardamos session.user. Si no existe una sesión, guardamos null.
        setCargando(false); //dejamos de considerar que estamos cargando.
        });

        return () => {
        subscription.unsubscribe(); //función de limpieza de useEffect
        };
    }, []); //indica que el efecto se configura al montar el componente.
    
    //registrar un nuevo usuario
    async function registrarse(email, password) {
        const { data, error } = await supabase.auth.signUp({ //permite registrar un usuario nuevo -> recibe: email, password y obtenemos data, error
        email,
        password,
        });

        return { data, error };
    }

    //iniciar sesión
    async function iniciarSesion(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ //verifica las credenciales del usuario, si son correctas, Supabase genera una sesión y nuestro onAuthStateChange() detecta automáticamente el cambio.
        email,
        password,
        });

        return { data, error };
    }

    //cerrar sesión
    async function cerrarSesion() {
        const { error } = await supabase.auth.signOut(); //listener recibe una sesión nula y actualiza setUsuario(null)

        return { error };
    }

    //compartir los datos y funciones del contexto
    return (
        <AuthContext.Provider
        value={{
            usuario,
            cargando,
            registrarse,
            iniciarSesion,
            cerrarSesion,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}

//hook personalizado para utilizar el contexto
export function useAuth() {
    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error('useAuth debe utilizarse dentro de AuthProvider');
    }

    return contexto;
}