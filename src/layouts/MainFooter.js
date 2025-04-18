import React from "react";
import { Typography } from "@mui/material";

function MainFooter() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      p={1}
      mt={2}
    >
      {"Copyright © Minh Lgm "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
