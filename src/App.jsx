import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
