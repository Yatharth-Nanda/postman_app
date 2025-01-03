import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { ButtonAppBar } from "../components/ButtonAppbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function PatientHome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ButtonAppBar />
      <Box sx={{ flexGrow: 1, mt: 8, p: 2 }}>
        {" "}
        {/* Add margin-top to create space below AppBar */}
        <Card>
          <CardMedia
            component="img"
            sx={{ width: 128, height: 128 }} // Set width and height for passport size
            image="https://via.placeholder.com/150" // Replace with actual profile picture URL
            alt="Patient Profile Picture"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Patient Name : {user.name}
            </Typography>
          </CardContent>
        </Card>
        <Box mt={2} display="flex" justifyContent="flex-start" gap={2}>
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
    </Box>
  );
}

export { PatientHome };
