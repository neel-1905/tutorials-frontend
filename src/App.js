import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTutorials from "./components/AddTutorials";
import EditTutorial from "./components/EditTutorial";
import Header from "./components/Header";
import ListTutorials from "./components/ListTutorials";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<ListTutorials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addTutorials" element={<AddTutorials />} />
            <Route path="/editCourse/:id" element={<EditTutorial />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
