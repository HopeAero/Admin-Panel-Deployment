import { Button, Pagination } from '@mui/material'
import { IconTrash } from '@tabler/icons'
import DynamicTable from 'components/DynamicTable'
// Own
import { Application } from 'services/applications/types'
import { FunctionComponent, useCallback, useState } from 'react'
import { ApplicationPaginatedResponse } from 'services/applications/get-paginate'
import styled from 'styled-components'
// import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import deleteApplication from 'services/applications/delete-application'
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
  const [publicationId, setPublicationId] = useState<number>(0)
  const [userId, setUserId] = useState<number>(0)

  const handleOpen = useCallback((publicationId: number, userId: number) => {
    setOpen(true)
    setPublicationId(publicationId)
    setUserId(userId)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setPublicationId(0)
    setUserId(0)
  }, [])

  const onDelete = useCallback(
    async (publicationId: number, userId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deleteApplication(publicationId, userId)
        dispatch(setSuccessMessage(`Postulación eliminada correctamente`))
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
          {
            columnLabel: 'Publicación',
            cellAlignment: 'left',
            fieldName: 'publicationName'
          },
          {
            columnLabel: 'Postulante',
            fieldName: 'userName',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Descripción',
            fieldName: 'applicationDescription',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'isAccepted',
            fieldName: 'isAccepted',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Creación',
            fieldName: 'applicationCreatedAt',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Última Actualización',
            fieldName: 'applicationUpdatedAt',
            cellAlignment: 'left'
          }
        ]}
        rows={items}
        components={[
          (row: Application) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.publicationId, +row.userId)}
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
          onDelete(publicationId, userId)
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

type Props = ApplicationPaginatedResponse & {
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
