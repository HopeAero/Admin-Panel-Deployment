import { Button, Pagination } from '@mui/material'
import { IconTrash, IconEdit } from '@tabler/icons'
import DynamicTable from 'components/DynamicTable'
// Own
import { Swap } from 'services/swaps/types'
import { FunctionComponent, useCallback, useState } from 'react'
import { SwapPaginatedResponse } from 'services/swaps/get-paginate'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import deleteSwap from 'services/swaps/delete-swap'
import DialogDelete from 'components/dialogDelete'

const Table: FunctionComponent<Props> = ({
  items,
  paginate,
  className,
  onChange,
  fetchItems
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [stateId, setStateId] = useState<number>(0)

  const handleOpen = useCallback((stateId: number) => {
    setOpen(true)
    setStateId(stateId)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setStateId(0)
  }, [])

  const onDelete = useCallback(
    async (swapId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deleteSwap(swapId!)
        dispatch(setSuccessMessage(`Cambio eliminado correctamente`))
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()))
        }
      } finally {
        dispatch(setIsLoading(false))
        handleClose()
        fetchItems()
      }
    },
    [dispatch, fetchItems, handleClose]
  )

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: 'ID', fieldName: 'swapId', cellAlignment: 'left' },
          {
            columnLabel: 'Monto',
            cellAlignment: 'left',
            onRender: (row: Swap) => (row.amount ? '$' + row.amount : '')
          },
          {
            columnLabel: 'Origen',
            fieldName: 'source',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Destino',
            fieldName: 'destination',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Creación',
            fieldName: 'createdAt',
            cellAlignment: 'left'
          }
        ]}
        rows={items}
        components={[
          (row: Swap) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/general/swaps/edit/' + row.swapId)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Swap) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.swapId)}
              startIcon={<IconTrash />}
            >
              Eliminar
            </Button>
          )
        ]}
      />
      <DialogDelete
        handleClose={handleClose}
        onDelete={() => {
          onDelete(stateId)
        }}
        open={open}
      />
      <div className={'paginator-container'}>
        <Pagination
          count={paginate.pages}
          page={paginate.page}
          variant='outlined'
          shape='rounded'
          color='primary'
          onChange={(event, page) => {
            onChange(page)
          }}
        />
      </div>
    </div>
  )
}

type Props = SwapPaginatedResponse & {
  className?: string
  onChange: (page: number) => void
  fetchItems: () => void
}

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`
