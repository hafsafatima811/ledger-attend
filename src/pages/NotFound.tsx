import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-subtle">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist in our blockchain attendance system.
        </p>
        <Button asChild className="gradient-primary text-white">
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Return to System
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
