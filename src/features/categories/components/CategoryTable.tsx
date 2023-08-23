import { GridFilterModel } from "@mui/x-data-grid";
import { Results } from "../../../types/Category"

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
}: Props) {}