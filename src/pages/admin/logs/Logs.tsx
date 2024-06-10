import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import './logs.scss';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';
import DataTable from '../../../components/dataTable/DataTable.tsx';
import { logsReqs } from '../../../requests/logs/logsReqs.ts';

export const Logs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogs, setIsLogs] = useState([]);

  const logsGrid: GridColDef[] = [
    {
      field: 'login',
      headerAlign: 'center',
      headerClassName: 'headerBox',
      cellClassName: 'idClass',
      headerName: 'Login',
      flex: 0.008,
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      cellClassName: 'nameCell',
      headerClassName: 'headerBox',
      flex: 0.03,
    },
    {
      field: 'ip',
      type: 'string',
      headerName: 'IP',
      flex: 0.01,
      headerAlign: 'center',
      headerClassName: 'headerBox',
      cellClassName: 'nameCell',
    },
    {
      field: 'created',
      type: 'string',
      headerName: 'Created At',
      flex: 0.01,
      cellClassName: 'nameCell',
      headerAlign: 'center',
      headerClassName: 'headerBox',
    },
  ];

  useEffect(() => {
    logsReqs
      .getLogs()
      .then((res) => {
        setIsLogs(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <MainSpinner isLoading={isLoading} />
  ) : (
    <div className="logs">
      <div className="logs-page">
        <h1>Logs</h1>
      </div>
      <DataTable slug="logs" columns={logsGrid} rows={isLogs} />
    </div>
  );
};

export default Logs;
