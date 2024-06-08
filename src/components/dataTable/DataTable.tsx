import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './dataTable.scss';
import { Link } from 'react-router-dom';

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  useAction?: boolean;
  useCheckbox?: boolean;
};

const DataTable = (props: Props) => {
  const handleDelete = (id: number) => {
    console.log(id);
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 100,
    headerAlign: 'center',
    headerClassName: 'headerBox',
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        style={{ border: 2, borderStyle: 'solid', borderColor: '#384256', borderRadius: 10 }}
        className="dataGrid"
        rows={props.rows}
        columns={props.useAction ? [...props.columns, actionColumn] : [...props.columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
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
