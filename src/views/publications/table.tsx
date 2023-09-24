import { Button, Pagination } from '@mui/material'
import { IconTrash } from '@tabler/icons'
import DynamicTable from 'components/DynamicTable'
// Own
import { User } from 'services/users/types'
import { FunctionComponent, useCallback, useState } from 'react'
import { PublicationPaginatedResponse } from 'services/publications/get-paginate'
import styled from 'styled-components'
// import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import deletePublication from 'services/publications/delete-publication'
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
    async (swapId: number) => {
      try {
        dispatch(setIsLoading(true))
        await deletePublication(swapId!)
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
          {
            columnLabel: 'ID',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.publicationId
          },
          {
            columnLabel: 'Nombre',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.projectName
          },
          {
            columnLabel: 'Descripción de Proyecto',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.projectDescription
          },
          {
            columnLabel: 'Descripción de Postulación',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.applicationDescription
          },
          {
            columnLabel: 'Dificultad',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.difficulty
          },
          {
            columnLabel: 'Estado',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.status
          },
          {
            columnLabel: 'Lider de Proyecto',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.userLeadName
          },
          {
            columnLabel: 'Creación',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.createdAt
          },
          {
            columnLabel: 'Ultima Actualización',
            cellAlignment: 'left',
            onRender: (row: any) => row.publication.updatedAt
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

type Props = PublicationPaginatedResponse & {
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
