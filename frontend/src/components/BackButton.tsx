import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
interface BackButtonProps {
  path: string;
}

const BackButton = (props: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(props.path)} // The -1 tells the router to go back one step in history
    >
      Go Back
    </Button>
  );
};

export default BackButton;
