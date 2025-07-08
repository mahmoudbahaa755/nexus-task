import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Button variant="outline" onClick={handleBack} className="mb-6">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
}
