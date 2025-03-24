import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Users from "./Users";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} /> {/* ✅ Fixed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
