import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, getUserRequest,sendEmailRequest, resetPasswordUserRequest,getQuestionUserRequest, findUserRequest, updateUserRequest, deleteUserRequest, getQuestionsRequest, createUserRequest, getRolesRequest, getUsersRequest } from '../api/auth';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            return true; // Registro exitoso
        } catch (error) {
            setErrors(error.response.data);
            return false; // Hubo un error
        }
    };


    //para traer los datos al form de actualizar producto
    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            Cookies.set('user', JSON.stringify(res.data));
            //console.log(res.data);
            return res.data.rol;
        } catch (error) {
            setErrors([error.response.data.message]);
            setIsAuthenticated(false);
            return null;
        }
    };
    const verifyToken = () => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            try {
                const userData = JSON.parse(userCookie);
                setUser(userData);
                setIsAuthenticated(true);
                return userData;
            } catch (error) {
                console.error("Error al parsear la cookie:", error);
                setIsAuthenticated(false);
                return null;
            }
        }
        setIsAuthenticated(false);
        return null;
    };
    

    const createUser = async (user) => {
        try {
            await createUserRequest(user); //solo se ejecuta la funcionpara poder crear el usuario, el await es importante señorwersegwfqd
            await getUsers();
            return true;
        } catch (error) {
            setErrors(error.response.data);
            return false; // Hubo un error
        }
    };

    const sendEmail = async (data) => {
        try {
            const res = await sendEmailRequest(data);
            return res; 
        } catch (error) {
            console.log(error);
            return false; // Hubo un error
        }
    };


    const resetPassword = async (data) => {
        try {
            const res = await resetPasswordUserRequest(data); 
            return res.data; // Devuelve la respuesta de la API
        } catch (error) {
            console.error( error);
            setErrors(error.response.data);
            return error.res.data 
        }
    };    

    const findUser = async (user) => {
        try {
            const res = await findUserRequest(user); //solo se ejecuta la funcionpara poder crear el usuario, el await es importante señorwersegwfqd
            //console.log(userr);
            return res.data
        } catch (error) {
            //aqui no retorno el arregl d errores para que no se muestren las alertas repetidamente
            //luego no se como manejar los errores
            console.log(error);
            return false; // Hubo un error
        }
    };

    const getQuestionUser = async (id) => {
        try {
            const res = await getQuestionUserRequest(id); // Guardamos la respuesta
            return res.data // Retornamos la información obtenida
        } catch (error) {
            setErrors(error.response?.data || ["Ocurrió un error"]); // Manejo de errores más seguro
            return false; // Hubo un error
        }
    };

    const updateUser = async (id, user) => {
        try {
            await updateUserRequest(id, user)
            return true;
        } catch (error) {
            setErrors(error.response.data);
            // console.error("Error al crear el producto:", error);
            return false;
        }
    }

    const logout = () => {
        Cookies.remove('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const res = await getQuestionsRequest();
            setQuestions(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener las preguntas:", error);
            return [];
        }
    };

    const [roles, setRoles] = useState([]);

    const getRoles = async () => {
        try {
            const res = await getRolesRequest();
            setRoles(res.data);
            return res.data;
        } catch (error) {
            console.error("Roles Error fssd xd:", error);
            return [];
        }
    };

    const [users, setUsers] = useState([]);
    //pa obtener los usuarios
    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id)
            if (res.status === 204) setUsers(users.filter(user => user._id !== id))
        } catch (error) {
            console.log(error);
        }

    };

    // Funcion para limpiar errores
    const clearErrors = () => {
        setErrors([]);
    };

    useEffect(() => {
        verifyToken(); // Verifica la autenticación desde la cookie al cargar la app
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ signup, resetPassword,verifyToken,updateUser,sendEmail, signin, user, users, getQuestionUser, deleteUser, findUser, logout, getUser, isAuthenticated, errors, loading, clearErrors, getQuestions, questions, createUser, roles, getRoles, getUsers }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node, // `node` acepta cualquier cosa que pueda ser renderizada en React
};