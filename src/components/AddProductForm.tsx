import * as React from "react";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

interface AddProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddProductForm: React.FC<AddProductProps> = ({ open, setOpen }) => {
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleClose = async () => {
    await delay(1000);
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            console.log(formData);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson.email);
            if (
              formJson.name &&
              formJson.price &&
              formJson.category &&
              formJson.stock &&
              formJson.imageUrl &&
              formJson.sku
            ) {
              setShowSuccessMessage(true);
              handleClose();
            }
          },
        }}
      >
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {showSuccessMessage ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                The new Product is added.
              </Alert>
            ) : null}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="category"
            name="category"
            label="Category"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="stock"
            name="stock"
            label="Stock"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="imageUrl"
            name="imageUrl"
            label="Image Url"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="sku"
            name="sku"
            label="SKU"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Product</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddProductForm;
