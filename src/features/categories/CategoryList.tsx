import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete"

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories)

  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  }

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name, 
    isActive: category.is_active,
    description: category.description,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  }))
  
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name 2",
      flex: 1,
      renderCell: renderNameCell
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },  
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      renderCell: renderActionsCell,
    }
  ];

  function renderActionsCell() {
    return (
      <IconButton
        color="secondary"
        arial-label="delete"
        onClick={() => console.log("clicked")}
        >
        <DeleteIcon />
      </IconButton>
    )
  }

  function renderNameCell(rowData: GridRenderCellParams) {
  return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    )
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4}}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          component={Link}
          color="secondary"
          variant="contained"
          to="/categories/create"
          style={{ marginBottom: "1rem"}}
        >
          New Category
        </Button>
      </Box>

        {/* {categories.map((category) => (
          <Typography key={category.id}>{category.name}</Typography>
        ))} */}
      <Box sx={{ display: "flex", height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slotProps={slotProps}
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick={true}
          pageSizeOptions={[2, 20, 50, 100]}
        />
      </Box>
    </Box>
  )
};