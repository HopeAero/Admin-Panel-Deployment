import { Button, Pagination } from '@mui/material'
import DynamicTable from 'components/DynamicTable'
import { Client } from 'services/clients/types'
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
import { IconEdit, IconEye, IconTrash } from '@tabler/icons'
import { useNavigate } from 'react-router'
import deleteClient from 'services/clients/delete-client'
import DialogDelete from 'components/dialogDelete'

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
  const [clientId, setClientId] = useState<number>(0)

  const handleOpen = useCallback((clientId: number) => {
    setOpen(true)
    setClientId(clientId)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setClientId(0)
  }, [])

  const onDelete = useCallback(
    async (clientId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deleteClient(clientId!)
        //navigate('/clients');
        dispatch(setSuccessMessage(`Cliente eliminado correctamente`))
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
          { columnLabel: 'ID', fieldName: 'clientId', cellAlignment: 'left' },
          { columnLabel: 'Nombre', fieldName: 'name', cellAlignment: 'left' },
          {
            columnLabel: 'Número de Teléfono',
            cellAlignment: 'left',
            onRender: (row: Client) =>
              row.mainPhone
                ? row.mainPhone.slice(0, 4) +
                  ' ' +
                  row.mainPhone.slice(4, 7) +
                  ' ' +
                  row.mainPhone.slice(7, 11)
                : ''
          },
          // {
          //   columnLabel: 'Teléfono Secundario',
          //   cellAlignment: 'left',
          //   onRender: (row: Client) =>
          //     row.secondaryPhone
          //       ? row.secondaryPhone.slice(0, 4) +
          //         ' ' +
          //         row.secondaryPhone.slice(4, 7) +
          //         ' ' +
          //         row.secondaryPhone.slice(7, 11)
          //       : ''
          // },
          {
            columnLabel: 'Creación',
            fieldName: 'createdAt',
            cellAlignment: 'left'
          }
        ]}
        rows={items}
        components={[
          (row: Client) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/clientela/clients/edit/' + row.clientId)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Client) => (
            <Button
              color='secondary'
              onClick={() => {
                navigate('/general/wallets/detail/' + row.clientId)
              }}
              startIcon={<IconEye />}
            >
              Detalle
            </Button>
          ),
          (row: Client) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.clientId)}
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
          onDelete(clientId)
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
  items: Client[]
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
