import { Button, Pagination } from '@mui/material'
import { IconTrash, IconEdit, IconEye } from '@tabler/icons'
import DynamicTable from 'components/DynamicTable'
// Own
import { Wallet } from 'services/wallets/types'
import { FunctionComponent, useCallback, useState } from 'react'
import { WalletPaginatedResponse } from 'services/wallets/get-paginate'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import deleteWallet from 'services/wallets/delete-wallet'
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
    async (walletId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deleteWallet(walletId!)
        dispatch(setSuccessMessage(`Billetera eliminada correctamente`))
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
          { columnLabel: 'ID', fieldName: 'walletId', cellAlignment: 'left' },
          {
            columnLabel: 'Nombre de la Billetera',
            fieldName: 'description',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Balance',
            cellAlignment: 'left',
            onRender: (row: Wallet) => (row.balance ? '$' + row.balance : '')
          },
          {
            columnLabel: 'Creación',
            fieldName: 'createdAt',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Última Actualización',
            fieldName: 'updatedAt',
            cellAlignment: 'left'
          }
        ]}
        rows={items}
        components={[
          (row: Wallet) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/general/wallets/edit/' + row.walletId)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Wallet) => (
            <Button
              color='secondary'
              onClick={() => {
                navigate('/general/wallets/detail/' + row.walletId)
              }}
              startIcon={<IconEye />}
            >
              Detalle
            </Button>
          ),
          (row: Wallet) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.walletId)}
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

type Props = WalletPaginatedResponse & {
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
