import { Box, Button, Typography, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import type { CustomApiError } from "../../models/error";
import { useNavigate } from "react-router-dom";

export const Error400View = ({ error }: { error: CustomApiError }) => {
  const navigate = useNavigate();
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Hubo un problema con el request";
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
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h4">
          Error en la solicitud ({error?.response?.status || error?.status})
        </Typography>
        <Typography color="text.secondary">{errorMessage}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/panel/products")}
        >
          Regresar al catalogo
        </Button>
      </Box>
    </Container>
  );
};
