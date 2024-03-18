import { useDispatch, useSelector } from "react-redux";
import productSlice, { fetchProductsSuccess } from "../store/productSlice"
import React, {useState, useEffect } from "react";
import fetchProduct from "../functions/fetchProducts";
import { Product } from "./types/Product";
import Box from '@mui/material/Box';
// mui
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'title' | 'id' | 'weight' | 'width' | 'height' | 'depth';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'title', label: 'Name', minWidth: 170 },
    { id: 'id', label: 'SKU', minWidth: 100 },
    {
      id: 'weight',
      label: 'weight',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'width',
      label: 'width',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'height',
      label: 'height',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'depth',
      label: 'depth',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];
  
  interface Data {
    title: string;
    id: string;
    weight: number;
    width: number;
    height: number;
    depth: number;
  }
  
  function createData(
    title: string,
    id: string,
    weight: number,
    width: number,
    height: number,
    depth: number,
  ): Data {
    return { title, id, weight, width, height, depth };
  }

const ProudctList = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state: any) => state.products.productList)

    const rows: Data[] = []

    const rowsMaking = productList?.forEach((product: any) => {
        // console.log(product)
        rows.push(createData(product.title, product.id, product.weight, product.width, product.height, product.depth))
    })

    // mui
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // if i want to use API 
    // useEffect(()=> {
    //     const fetchData = async () => {
    //         // const products: Product[] | undefined = await fetchProduct();
            
    //         // if (products) {
    //         //     dispatch(fetchProductsSuccess(products));
    //         // }
    //     };
      
    //     fetchData();

    // }, [dispatch])

    useEffect(()=> {
        // console.log(productList)
    }, [productList])



    return (
      <>
      {productList!=null && productList.length > 0  ? 
      <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Paper sx={{ width: '100%', overflow: 'hidden', }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Box>
      </Container>
    
     : <></>}
    </>
    )
}

export default ProudctList