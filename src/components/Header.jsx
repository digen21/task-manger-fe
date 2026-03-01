import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
