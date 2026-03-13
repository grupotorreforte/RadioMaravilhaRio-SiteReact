import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Headphones, Video, Youtube, Instagram, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import logoHeader from "@/assets/logo_maravilha_topo.png";


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isLivePage = location.pathname === "/assistir-ao-vivo";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {isLivePage && (
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
            <img
              src={logoHeader}
              alt="Logo Maravilha FM"
              className="h-5 md:h-5 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className="gap-2"
              >
                <Home size={18} />
                Home
              </Button>
            </Link>
            <Link to="/ouvir-ao-vivo">
              <Button
                variant={isActive("/ouvir-ao-vivo") ? "default" : "ghost"}
                className="gap-2"
              >
                <Headphones size={18} />
                Ouvir Ao vivo
              </Button>
            </Link>
            <Link to="/assistir-ao-vivo">
              <Button
                variant={isActive("/assistir-ao-vivo") ? "default" : "ghost"}
                className="gap-2"
              >
                <Video size={18} />
                Assistir ao Vivo
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
         {/*    <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-primary hover:text-primary-light"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button> */}
            <a
              href="https://www.youtube.com/@radio89maravilha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors"
            >
              <Youtube size={35} />
            </a>
            <a
              href="https://www.instagram.com/radio89maravilha/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors"
            >
              <Instagram size={33} />
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-center space-x-1 mt-3">
          <Link to="/">
            <Button
              size="sm"
              variant={isActive("/") ? "default" : "ghost"}
              className="gap-1 text-xs"
            >
              <Home size={16} />
              Home
            </Button>
          </Link>
          <Link to="/ouvir-ao-vivo">
            <Button
              size="sm"
              variant={isActive("/ouvir-ao-vivo") ? "default" : "ghost"}
              className="gap-1 text-xs"
            >
              <Headphones size={16} />
              Ouvir
            </Button>
          </Link>
          <Link to="/assistir-ao-vivo">
            <Button
              size="sm"
              variant={isActive("/assistir-ao-vivo") ? "default" : "ghost"}
              className="gap-1 text-xs"
            >
              <Video size={16} />
              Assistir
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
