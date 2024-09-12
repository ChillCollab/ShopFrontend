import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import './dataTable.scss';
import UsersToolbar from './UsersToolbar.tsx';
import { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../../pages/admin/users/Users.types.ts';

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  useAction?: boolean;
  useCheckbox?: boolean;
  isDelete?: boolean;
  setIsDelete?: (arg: boolean) => void;
  setIsOpenEdit?: (arg: boolean) => void;
  setIsUserData?: Dispatch<SetStateAction<User>>;
  pageSize?: number;
  rowName?: string;
};

const DataTable = (props: Props) => {
  const [selectionModel, setSelectionModel] = useState<object[]>([]);

  const handleSelectionModelChange = (newSelectionModel: GridRowSelectionModel) => {
    const selectedRows = props.rows.filter((row: any) => newSelectionModel.includes(row.id));
    setSelectionModel(selectedRows);
  };

  return (
    <div className="dataTable">
      <DataGrid
        style={{ borderColor: 'transparent' }}
        className="dataGrid"
        rows={props.rows}
        hideFooterSelectedRowCount={true}
        columns={[...props.columns]}
        onRowSelectionModelChange={handleSelectionModelChange}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: props.pageSize || 15,
            },
          },
        }}
        slots={{ toolbar: UsersToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            isDelete: props.isDelete,
            setIsOpenEdit: props.setIsOpenEdit,
            setIsDelete: props.setIsDelete,
            setIsUserData: props.setIsUserData,
            rows: props.rows,
            allRowsCount: props.rows.length,
            selectedRows: selectionModel,
            quickFilterProps: { debounceMs: 200 },
          },
        }}
        pageSizeOptions={[props.pageSize || 15]}
        checkboxSelection={props.useCheckbox}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
