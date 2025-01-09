import * as React from "react";
import useCrud from "../hooks/useCrud";
import userCrud from "../hooks/userCrud";
import productCrud from "../hooks/productCrud";
import { useEffect } from "react";
import { Cart, User } from "../@types/cart";
import { Product } from "../@types/product";
import { Box } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "./TablePaginationProps";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Row from "./CartRowProps";

const CartTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { dataCRUD, fetchData } = useCrud<Cart>([], "carts");
  const { users, fetchUserData } = userCrud<User>([], "users");
  const { products, fetchProductData } = productCrud<Product>([], "products");

  useEffect(() => {
    fetchData();
    fetchUserData();
    fetchProductData();
  }, []);

  useEffect(() => {}, [dataCRUD, users, products]);

  function getDateString(dateIsoString: string) {
    const date = new Date(dateIsoString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const formattedTime = formatter.format(date);
    return (
      date.getMonth() +
      1 +
      "/" +
      (date.getDate() + "/" + date.getFullYear() + " " + formattedTime)
    );
  }

  function findUser(userId: number) {
    const user = users.find((user) => user.id == userId);
    return user;
  }

  function filterProducts(productIds: number[]) {
    const filteredProducts = products.filter((x) =>
      productIds.some((y) => y == x.id)
    );
    return filteredProducts;
  }

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataCRUD.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Number of items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? dataCRUD.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataCRUD
            ).map((row) => (
              <Row
                key={row.id}
                row={row}
                dateString={getDateString(row.date)}
                user={findUser(row.userId)}
                products={filterProducts(
                  row.items.map((item) => item.productId)
                )}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[3, 5, 7, { label: "All", value: -1 }]}
                colSpan={3}
                count={dataCRUD.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartTable;
