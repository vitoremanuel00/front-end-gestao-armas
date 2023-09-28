import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Armas } from "./pages/Armas";
import { isAuthenticated } from "./utils/is-authenticated";

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/armas" replace />;
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
                <Route path="/" element={<Armas />}/>
                <Route path="/armas" element={<Armas />} />
            </Routes>
        </BrowserRouter>
    );
}