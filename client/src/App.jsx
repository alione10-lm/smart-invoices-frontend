import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layouts/AppLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                    <Route path="/" element={<h1>Dashboard</h1>} />
                    <Route path="/suppliers" element={<h1>Suppliers</h1>} />
                    <Route
                        path="/suppliers/:id"
                        element={<h1>Supplier Details</h1>}
                    />
                    <Route path="/invoices" element={<h1>Invoices</h1>} />
                    <Route
                        path="/invoices/:id"
                        element={<h1>Invoice Details</h1>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
