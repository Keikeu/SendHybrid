import Button from "commons/components/Button";
import Typography from "commons/components/Typography";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import Flexbox from "commons/components/Flexbox";
import FileUpload from "./FileUpload";
import callApi from "commons/util/callApi";

const STATUS = {
  VALID: "VALID",
  INVALID: "INVALID",
  UNVERIFIED: "UNVERIFIED",
  IN_PROGRESS: "IN_PROGRESS",
  PROCESSING_ERROR: "PROCESSING_ERROR",
};

const Container = styled.div`
  max-width: 1024px;
  margin: 40px auto;
`;

const TableWrap = styled.div`
  height: 800px;
`;

const EmptyState = styled(Flexbox)`
  text-align: center;
  height: 800px;
`;

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
`;

const StatusBadge = styled.div`
  border-radius: var(--border-radius-1);
  background-color: var(--neutral-190);
  color: var(--neutral-120);
  padding: 4px 8px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 800;

  ${({ status }) =>
    status === STATUS.VALID &&
    css`
      background-color: var(--green-190);
      color: var(--green-100);
    `}

  ${({ status }) =>
    status === STATUS.INVALID &&
    css`
      background-color: var(--red-190);
      color: var(--red-100);
    `}

  ${({ status }) =>
    status === STATUS.UNVERIFIED &&
    css`
      background-color: var(--neutral-190);
      color: var(--neutral-140);
    `}
`;

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "fileName", headerName: "File name", flex: 1, minWidth: 150 },
  {
    field: "addedDate",
    headerName: "Date added",
    width: 200,
    renderCell: (params) => (
      <>
        {new Date(params.value).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
        })}
      </>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <>
        <StatusBadge status={params.value}>{params.value}</StatusBadge>
      </>
    ),
  },
  {
    field: "actions",
    type: "actions",
    width: 120,
    getActions: (params) => [
      <>
        {params.row.status !== STATUS.UNVERIFIED && (
          <Button
            icon="open_in_new"
            size="small"
            variant="tertiary"
            link={`/report/${params.id}`}
          >
            See report
          </Button>
        )}
      </>,
    ],
  },
];

function DocumentsEmptyState() {
  return (
    <EmptyState justifyContent="center" alignItems="center">
      <Typography variant="h3" color="neutral-160">
        No documents added yet
      </Typography>
    </EmptyState>
  );
}

function Documents() {
  const [open, setOpen] = useState(false);

  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadDocuments() {
    console.log("load docs");
    setLoading(true);
    const docs = await callApi("documents");
    setDocuments(docs);
    setLoading(false);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  function onFilesSent() {
    setTimeout(() => {
      loadDocuments();
      setOpen(false);
    }, 500);
  }

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Container>
      <Flexbox
        justifyContent="space-between"
        alignItems="center"
        margin="0 0 32px 0"
      >
        <Typography variant="h1">Documents</Typography>
        <Button icon="add" onClick={() => setOpen(true)}>
          Add document(s)
        </Button>
      </Flexbox>
      {documents.length ? (
        <TableWrap>
          <StyledDataGrid
            rows={documents}
            columns={columns}
            checkboxSelection
            pageSize={25}
            autoHeight
          />
        </TableWrap>
      ) : (
        <DocumentsEmptyState />
      )}

      <FileUpload
        open={open}
        onClose={() => setOpen(false)}
        onFilesSent={onFilesSent}
      />
    </Container>
  );
}

export default Documents;
