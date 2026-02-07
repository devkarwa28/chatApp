import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chat" element={
        <ProtectedRoute>
          <ChatPage/>
        </ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
  );
}

export default App;
