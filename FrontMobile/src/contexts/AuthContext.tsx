import { createContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, UserInfo } from "../types/authTypes";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "expo-router";
import { api } from "../api/api";
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    validateToken: () => {},
    user: undefined
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserInfo>();
    const decodificador = jwtDecode;
    const router = useRouter();

    useEffect(() => {
        console.log("AuthProvider montado, validando token...");
        validateToken();
      }, []);

    const login = async (email: string, password: string) => {
        try {
            console.log("Tentando fazer login com email:", email);
            const response = await api.post('/auth/login', {
                email,
                password
            });
            
            const token = response.data.model;
            console.log("Token recebido:", token);
            
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            await SecureStore.setItemAsync('token', token);
            console.log("Token armazenado no SecureStore");

            const decodedToken = decodificador(token);
            const JsonUserInfos = decodedToken.sub ? JSON.parse(decodedToken.sub) : null;

            setUser(JsonUserInfos);
            console.log("Usuário logado:", JsonUserInfos);
            
            setIsAuthenticated(true);
            console.log("Estado de autenticação atualizado para true");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

    const logout = async () => {
        try {
          console.log("Chamando logout...");
          await SecureStore.deleteItemAsync('token');
          console.log("Token removido");
          setIsAuthenticated(false);
          setUser(undefined);
          console.log("Estado de autenticação resetado");
          router.replace('/pages/auth/Login');
        } catch (error) {
          console.error("Erro ao deslogar:", error);
        }
      };    

    const validateToken = async () => {
        const token = await SecureStore.getItemAsync('token');
        console.log("Token recuperado do SecureStore:", token);
        if (token) {
            try {
                const decodedToken = decodificador(token) as any;
                const isExpired = decodedToken?.exp ? decodedToken.exp * 1000 < Date.now() : true;
    
                if (isExpired) {
                    console.log("Token expirado, deslogando...");
                    await logout();
                    return;
                }
    
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                setUser(decodedToken.sub);
                setIsAuthenticated(true);
                console.log("Token válido, usuário autenticado");
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
            }
        } else {
            console.log("Nenhum token encontrado no SecureStore");
        }
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, validateToken }}>
          {children}
        </AuthContext.Provider>
      );
};