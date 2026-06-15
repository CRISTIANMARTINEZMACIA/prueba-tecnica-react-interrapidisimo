// src/views/errors/NotFoundView.tsx
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export const NotFoundView = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          gap: 2,
        }}
      >
        <SearchOffIcon color="warning" sx={{ fontSize: 80 }} />
        <Typography variant="h3" color="primary">
          404
        </Typography>
        <Typography variant="h5">Página No Encontrada</Typography>
        <Typography color="text.secondary">
          La ruta que intentas buscar no existe o ha sido movida temporalmente.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Regresar al Catálogo
        </Button>
      </Box>
    </Container>
  );
};
