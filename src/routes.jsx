import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Armas } from "./pages/Armas";
import { isAuthenticated } from "./utils/is-authenticated";
import HomePage from "./pages/HomePage";
import ArmasEmprestadas from "./pages/ArmasEmprestadas";
import Dashboards from "./pages/Dashboards";
import PerfilPage from "./pages/PerfilPage";

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/home" replace />;
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} /> {/* Adicione esta rota */}
                <Route path="/armas" element={<Armas />} />
                <Route path="/listaremprestimos" element={<ArmasEmprestadas />} />
                <Route path="/dashboard" element={<Dashboards />}/>
                <Route path="/perfil" element={<PerfilPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

