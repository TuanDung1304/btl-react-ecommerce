import { Box, Button } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    background: 'white',
    padding: '20px',
    '& .MuiDataGrid-toolbarContainer': {
      flexDirection: 'row-reverse',
    },
    img: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
  },

  action: {
    display: 'flex',
    gap: '15px',

    img: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    },
  },

  actionButtonGroup: {
    display: 'flex',
    gap: 6,
    '& button': {
      padding: '2px 5px',
    },
  },
}))

function ActionButtons(
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>,
) {
  const { classes } = useStyles()

  return (
    <Box className={classes.actionButtonGroup}>
      <Button variant="contained" color="success">
        Edit
      </Button>
      <Button variant="contained" color="error">
        Delete
      </Button>
    </Box>
  )
}

type Props = {
  columns: GridColDef[]
  rows: object[]
  slug: string
}

export default function DataTable(props: Props) {
  const { classes } = useStyles()

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 155,
    renderCell: ActionButtons,
  }

  return (
    <DataGrid
      className={classes.root}
      rows={props.rows}
      columns={[...props.columns, actionColumn]}
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
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnFilter
      disableDensitySelector
      disableColumnMenu
      disableVirtualization
    />
  )
}
