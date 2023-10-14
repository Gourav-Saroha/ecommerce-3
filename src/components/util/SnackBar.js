import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import CartContext from "../Context/cart-context";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SnackBar = () => {
  const cartCtx = useContext(CartContext);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={cartCtx.open}
      autoHideDuration={1000}
    >
      <Alert severity="info">{cartCtx.snack}</Alert>
    </Snackbar>
  );
};

export default SnackBar;
