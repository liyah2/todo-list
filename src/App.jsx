import "./App.css";
import { Routes, Route } from "react-router";
import Header from "./shared/Header";
import TodosPage from "./features/Todos/TodosPage";
import Logon from "./features/Logon";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/login" element={<Logon />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/" element={<Logon />} />
      </Routes>
    </div>
  );
}

export default App;
