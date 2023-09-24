import { Button, Pagination } from '@mui/material'
import {
  IconTrash,
  IconEdit,
  IconCirclePlus,
  IconCircleMinus
} from '@tabler/icons'
import DynamicTable from 'components/DynamicTable'
// Own
import { Movement } from 'services/movements/types'
import { FunctionComponent, useCallback, useState } from 'react'
import { MovementPaginatedResponse } from 'services/movements/get-paginate'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import deleteMovement from 'services/movements/delete-movement'
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
    async (movementId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deleteMovement(movementId!)
        dispatch(setSuccessMessage(`Movimiento eliminado correctamente`))
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
          { columnLabel: 'ID', fieldName: 'movementId', cellAlignment: 'left' },
          {
            columnLabel: 'Descripción',
            fieldName: 'description',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Monto',
            cellAlignment: 'right',
            onRender: (row: Movement) =>
              row.amount ? (
                row.amount > 0 ? (
                  <>
                    {'$' + row.amount}
                    <IconCirclePlus color='#3ab77b' />
                  </>
                ) : (
                  <>
                    {'- $' + row.amount.toString().slice(1, 9)}
                    <IconCircleMinus color='orange' />
                  </>
                )
              ) : (
                ''
              )
          },
          {
            columnLabel: 'Billetera',
            fieldName: 'walletId',
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
          (row: Movement) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/general/movements/edit/' + row.movementId)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Movement) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.movementId)}
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

type Props = MovementPaginatedResponse & {
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
