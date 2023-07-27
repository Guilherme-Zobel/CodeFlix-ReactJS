import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete"

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories)

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name, 
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
  }))
  
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name 2",
      flex: 1,
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
        onClick={() => console.log("clicked")}
        arial-label="delete"
        >
        <DeleteIcon />
      </IconButton>
    )
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
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem"}}
        >
          New Category
        </Button>
      </Box>

        {/* {categories.map((category) => (
          <Typography key={category.id}>{category.name}</Typography>
        ))} */}
      <div style={{ height: 300, width: "100%"}}>
        <DataGrid
          pageSizeOptions={[2, 20, 50, 100]}
          disableRowSelectionOnClick={true}
          rows={rows}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableDensitySelector={true}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
    </Box>
  )
};