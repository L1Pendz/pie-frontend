import { useContext } from "react";
import "./App.css";
import { PieList } from "./components/PieList";
import { Button, Container } from "./components/styles";
import { PieProvider } from "./context/PieContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { AuthForm } from "./components/AuthForm";
import { PieForm } from "./components/PieForm";

function MainApp() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.dispatch({ type: "LOGOUT" });
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>🥧 The Pie Shop</h1>
        {authContext?.state.isAuthenticated && (
          <Button onClick={handleLogout} style={{ background: "#333" }}>
            Sign Out
          </Button>
        )}
      </div>

      {authContext?.state.isAuthenticated ? <PieForm/> : <AuthForm />}

      <hr style={{ margin: "30px 0", border: "1px solid #eee" }} />
      <h2>Menu</h2>
      <PieList />
    </Container>
  );
}

function App() {
  return (
    <PieProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </PieProvider>
  );
}

export default App;
