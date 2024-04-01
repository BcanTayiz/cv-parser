import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoutes"
import OtherTools from "./pages/OtherTools"

import Layout from "./components/Layout"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<ProtectedRoute><HomeLayout /></ProtectedRoute>} />
        <Route path="/other-tools" element={<ProtectedRoute><OtherLayout><OtherTools /></OtherLayout></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function OtherLayout({ children }) {
  return (
    <Layout>
      <Routes>
        {/* Define a route for the children */}
        <Route path="/" element={children} />
      </Routes>
    </Layout>
  );
}

function HomeLayout() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;