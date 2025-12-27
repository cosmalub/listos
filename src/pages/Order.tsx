import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redirect /order to home - the dialog is now triggered via context
export default function Order() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
