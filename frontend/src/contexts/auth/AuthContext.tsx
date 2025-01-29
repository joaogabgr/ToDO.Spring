import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal";
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, AuthProviderProps, UserInfo } from "../../type/auth";
import { useNavigate } from "react-router-dom";



// Crie o contexto de autenticação
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  validateToken: () => {}
});

// Crie o provedor do contexto de autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const decodificador = jwtDecode;
  const navigate = useNavigate(); 

  const login = async (email: string, senha: string) => {
    try {
      console.log(email, senha);
      
      const response = await api.post('/auth/login', {
        email: email,
        password: senha
      });
      
      var token = response.data.model;
    
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      
      const jsonUserInfo = JSON.parse(decodedToken.sub as string);
      console.log(jsonUserInfo);
      
      setUser(jsonUserInfo);
      setIsAuthenticated(true);
      navigate('/')
    } catch (error) {
      errorSwal((error as any).response.data.error);
    };
  };

  const logout = () => {
    api.defaults.headers.common.Authorization = ``;
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login')
  };

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ sub: string, exp: number }>(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error("Token expirado");
        }
        const jsonUserInfo = JSON.parse(decodedToken.sub);
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setUser(jsonUserInfo);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao validar token:", error);
        setIsAuthenticated(false);
      }
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};