import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import AddIncome from "./pages/AddIncome";
import SetBudget from "./pages/SetBudget";
import EditIncome from "./pages/EditIncome";
import ForgotPassword from "./pages/ForgotPassword";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/income" element={<Income />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-expense" element={<AddExpense />} />
      <Route path="/edit-expense/:id" element={<EditExpense />} />
      <Route path="/edit-income/:id" element={<EditIncome />} />
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/add-income" element={<AddIncome />} />
      <Route path="/set-budget" element={<SetBudget />} />
    </Routes>
  );
}

export default App;