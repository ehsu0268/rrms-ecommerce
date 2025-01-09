import * as React from "react";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ProductTable from "../../components/ProductTable";
import CartTable from "../../components/CartTable";
import AddProductForm from "../../components/AddProductForm";

const CenterContainer = () => {
  const [showCartButton] = React.useState(true);
  const [showCartList, setShowCartList] = React.useState(false);
  const [showProductList, setShowProductList] = React.useState(false);
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [, setShowSuccessMessage] = React.useState(false);

  const handleClickOpen = () => {
    setShowSuccessMessage(false);
    setOpen(true);
  };

  function showProducts() {
    setShowCartList(false);
    setShowProductList(true);
    setShowAddProduct(true);
  }

  function showCarts() {
    setShowCartList(true);
    setShowProductList(false);
    setShowAddProduct(false);
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{ pt: 6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                showProducts();
              }}
            >
              Products
            </Button>
          </Box>
          {showCartButton ? (
            <Box marginLeft={1}>
              <Button
                variant="outlined"
                onClick={() => {
                  showCarts();
                }}
              >
                Cart
              </Button>
            </Box>
          ) : null}
          {showAddProduct ? (
            <Box marginLeft={1}>
              <Button variant="outlined" onClick={() => handleClickOpen()}>
                Add Product
              </Button>
            </Box>
          ) : null}
        </Box>
        <br></br>
        {showProductList ? <ProductTable></ProductTable> : null}
        {showCartList ? <CartTable></CartTable> : null}
        <AddProductForm open={open} setOpen={setOpen} />
      </Container>
    </>
  );
};

export default CenterContainer;
