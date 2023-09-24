import { Button, Pagination } from '@mui/material'
import { IconTrash } from '@tabler/icons'
import DynamicTable from 'components/DynamicTable'
// Own
import { User } from 'services/users/types'
import { FunctionComponent, useCallback, useState } from 'react'
import { UserPaginatedResponse } from 'services/users/get-paginate'
import styled from 'styled-components'
// import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import deleteUser from 'services/users/delete-user'
import DialogDelete from 'components/dialogDelete'

const Table: FunctionComponent<Props> = ({
  items,
  paginate,
  className,
  onChange,
  fetchItems
}) => {
  // const navigate = useNavigate()
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
    async (userId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deleteUser(userId!)
        dispatch(setSuccessMessage(`Usuario eliminado correctamente`))
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
          { columnLabel: 'ID', fieldName: 'userId', cellAlignment: 'left' },
          {
            columnLabel: 'Nombre',
            fieldName: 'name',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Correo Electrónico',
            fieldName: 'email',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Ocupación',
            fieldName: 'occupation',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Rol',
            fieldName: 'role',
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
          (row: User) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.userId)}
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

type Props = UserPaginatedResponse & {
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
