import { Snackbar } from "@mui/material";
import type { ReactNode } from "react";

export interface ProcessSnackBarProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  action?: ReactNode;
  vertical?: "top" | "bottom";
  horizontal?: "center" | "left" | "right";
}
export const ProcessSnackBar = ({
  open,
  handleClose,
  action,
  message,
  vertical = "top",
  horizontal = "center",
}: ProcessSnackBarProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
};
