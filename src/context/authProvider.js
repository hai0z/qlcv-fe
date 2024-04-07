import { createContext, useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({});

  const [loading, setLoading] = useState(true);

  const { getUserById } = useUserStore((state) => state);
  const handleLogin = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      setAuth(res.data.data);
      navigate("/");
    } catch (error) {
      toast.error("Sai thông tin đăng nhập");
    }
  };

  const handleLogOut = async () => {
    try {
      await api.post("/auth/logout");
      setAuth({});
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get("/auth/verify-token");
        const user = await getUserById(res.data.data.id);
        setAuth({ ...user });
        setLoading(false);
      } catch (error) {
        navigate("/login");
        setLoading(false);
      }
    };
    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, handleLogin, handleLogOut, handleLogin }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
