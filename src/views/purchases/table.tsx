import { Button, Pagination } from '@mui/material'
import DynamicTable from 'components/DynamicTable'
import styled from 'styled-components'
// Own
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import { FunctionComponent, useCallback, useState } from 'react'
import { PaginateData } from 'services/types'
import {
  IconEdit,
  IconTrash,
  IconEye,
  IconCircleCheck,
  IconCircleDashed
} from '@tabler/icons'
import { useNavigate } from 'react-router'
import deletePurchase from 'services/purchases/delete-purchase'
import DialogDelete from 'components/dialogDelete'
import { Purchase } from 'services/purchases/types'

const Table: FunctionComponent<Prop> = ({
  items,
  paginate,
  className,
  onChange,
  fetchItems
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [orderId, setBookingId] = useState<number>(0)

  const handleOpen = (purchaseId: number) => {
    setOpen(true)
    setBookingId(purchaseId)
  }

  const handleClose = () => {
    setOpen(false)
    setBookingId(0)
  }

  const onDelete = useCallback(
    async (purchaseId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deletePurchase(purchaseId!)
        //navigate('/orders');
        dispatch(setSuccessMessage(`Orden de Venta eliminada correctamente`))
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
    [dispatch, fetchItems]
  )

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: 'ID', fieldName: 'purchaseId', cellAlignment: 'left' },
          {
            columnLabel: 'Lista',
            onRender: (row: Purchase) =>
              row.isDispatched ? (
                <IconCircleCheck color='#3ab77b' />
              ) : (
                <IconCircleDashed color='#2196f3' />
              ),
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Billetera',
            fieldName: 'walletId',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Monto Total',
            cellAlignment: 'left',
            onRender: (row: Purchase) =>
              row.totalAmount ? '$' + row.totalAmount : ''
          },
          {
            columnLabel: 'Creación',
            fieldName: 'createdAt',
            cellAlignment: 'left'
          }
        ]}
        rows={items}
        components={[
          (row: Purchase) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/business/purchases/edit/' + row.purchaseId)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Purchase) => (
            <Button
              color='secondary'
              onClick={() => {
                navigate('/business/purchases/detail/' + row.purchaseId)
              }}
              startIcon={<IconEye />}
            >
              Detalle
            </Button>
          ),
          (row: Purchase) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.purchaseId)}
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
          onDelete(orderId)
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

interface Prop {
  items: Purchase[]
  paginate: PaginateData
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
