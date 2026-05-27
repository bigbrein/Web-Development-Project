import HomePage from "../pages/home";
import Navbar from "../components/partials/navbar";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import NewPostForm from "../components/newPostForm";

function App() {
  return (
    <>
      <Navbar />
      <RegisterPage />
    </>
  );
}

export default App;
