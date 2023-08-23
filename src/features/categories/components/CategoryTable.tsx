import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { Results } from "../../../types/Category"
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom";

type Props = {
data: Results | undefined;
perPage: number;
IsFetching: boolean;
rowPerPage ?: number;


handleOnPageChange: (page: number) => void;
handleFilterChange: (filterModel: GridFilterModel) => void;
handleOnPageSizeChange: (perPage: number) => void;
handleDelete: (id: number) => void;
}


export function CategoriesTable({
data,
perPage,
IsFetching,
rowPerPage,
handleOnPageChange,
handleFilterChange,
handleOnPageSizeChange,
handleDelete
}: Props) {
const slotProps = {
		toolbar: {
			showQuickFilter: true,
			quickFilterProps: { debounceMs: 500 },
		},
	}

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
			type: "string",
			flex: 1,
			renderCell: renderActionsCell,
		}
	];


	function renderActionsCell(params: GridRenderCellParams) {

		return (
			<IconButton
				color="secondary"
				arial-label="delete"
				onClick={() => handleDelete(params.value)}
				>
				<DeleteIcon />
			</IconButton>
		)
	}

	function mapDataToGridRows(data: Results) {
		const { data: categories } = data;
		return categories.map((category) => ({
			id: category.id,
			name: category.name, 
			isActive: category.is_active,
			description: category.description,
			createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
		}))
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

	const rows = data ? mapDataToGridRows(data) : [];

	return (
		<Box sx={{ display: "flex", height: 600}}>
			<DataGrid rows={rows} columns={columns} />
		</Box>
	)
}