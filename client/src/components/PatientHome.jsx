import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function PatientHome() {
  const navigate = useNavigate();

  return (
    <Box p={2}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://via.placeholder.com/150" // Replace with actual profile picture URL
          alt="Patient Profile Picture"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Patient Name
          </Typography>
        </CardContent>
      </Card>

      <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E90FF",
            color: "white",
            padding: "10px 20px",
          }} // Specific blue color with padding
        >
          Book New Consultation
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E90FF",
            color: "white",
            padding: "10px 20px",
          }} // Specific blue color with padding
          onClick={() => navigate("/chat")} // Navigate to /chat on click
        >
          Past Consultations
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E90FF",
            color: "white",
            padding: "10px 20px",
          }} // Specific blue color with padding
        >
          Edit Medical Details
        </Button>
      </Box>
    </Box>
  );
}

export { PatientHome };
