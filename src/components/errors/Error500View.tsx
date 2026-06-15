import { Box, Button, Typography, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import type { FallbackProps } from "react-error-boundary";

export const Error500View = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Hubo un problema de comunicación con nuestros servidores o un fallo inesperado en la aplicación.";
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
        <Typography variant="h4">Error Interno del Servidor (500)</Typography>
        <Typography color="text.secondary">{errorMessage}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            resetErrorBoundary ? resetErrorBoundary() : window.location.reload()
          }
        >
          Reintentar Operación
        </Button>
      </Box>
    </Container>
  );
};
