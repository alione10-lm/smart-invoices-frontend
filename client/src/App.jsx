import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<h1>login</h1>} />
                <Route path="/register" element={<h1>register</h1>} />

                <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/suppliers" element={<h1>Suppliers</h1>} />
                    <Route
                        path="/suppliers/:id"
                        element={<h1>Supplier Details</h1>}
                    />

                    <Route path="/invoices" element={<Invoices />} />
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
