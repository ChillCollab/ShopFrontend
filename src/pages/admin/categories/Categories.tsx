import {GridColDef} from "@mui/x-data-grid";
import {MainSpinner} from "../../../components/spinners/MainSpinner.tsx";
import DataTable from "../../../components/dataTable/DataTable.tsx";
import React, {useEffect} from "react";
import adminReqs from "../../../requests/admin/admin.ts";
import {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {addAlert} from "../../../store/systemAlertSlices.ts";

const Categories = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isCategories, setIsCategories] = React.useState<never[]>([]);

    const categoriesGrid: GridColDef[] = [
        {
            field: 'name',
            headerAlign: 'center',
            headerClassName: 'headerBox',
            cellClassName: 'idClass',
            headerName: 'Name',
            flex: 0.008,
        },
        {
            field: 'image',
            headerName: 'Image',
            headerAlign: 'center',
            cellClassName: 'nameCell',
            headerClassName: 'headerBox',
            flex: 0.03,
            renderCell: (params) => {
                return <img style={{ height: '38px', width: '38px' }} src={params.row.image || '/no_image.svg'} alt="" />;
            },
        },
        {
            field: 'created',
            type: 'string',
            headerName: 'Created',
            flex: 0.01,
            cellClassName: 'nameCell',
            headerAlign: 'center',
            headerClassName: 'headerBox',
        },
        {
            field: 'updated',
            type: 'string',
            headerName: 'Updated',
            flex: 0.01,
            headerAlign: 'center',
            headerClassName: 'headerBox',
            cellClassName: 'nameCell',
        },
    ];

    const dispatch = useDispatch()

    useEffect(() => {
        adminReqs.getCategories()
            .then((res) => {
                let counter = 1;
                const dataWithId = res.data.map((category: { name: string, image: string, created_at: string, updated_at: string }) => {
                    return {...category, id: counter++}
                })
                setIsCategories(dataWithId)
            }).catch((e: AxiosError<{message: string, code: number}>) => {
                if (e.response?.data)
                    if (e.response?.data.code !== 306)
                    dispatch(addAlert({message: e.response?.data.message, type: 'error'}))
        })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dispatch]);

    return isLoading ? (
        <MainSpinner isLoading={isLoading} />
    ) : (
        <div className="logs">
            <div className="logs-page">
                <h1>Categories</h1>
            </div>
            <DataTable useCheckbox={true} slug="logs" columns={categoriesGrid} rows={isCategories} />
        </div>
    );
};

export default Categories