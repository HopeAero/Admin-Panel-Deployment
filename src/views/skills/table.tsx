import { Button, Pagination } from '@mui/material'
import { IconTrash, IconEdit } from '@tabler/icons'
import DynamicTable from 'components/DynamicTable'
// Own
import { Skill } from 'services/skills/types'
import { FunctionComponent, useCallback, useState } from 'react'
import { SkillPaginatedResponse } from 'services/skills/get-paginate'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import deleteSkill from 'services/skills/delete-skill'
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
        await deleteSkill(walletId!)
        dispatch(setSuccessMessage(`Habilidad eliminada correctamente`))
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
            columnLabel: 'Categoria ID',
            fieldName: 'skillCategoryId',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Habilidad ID',
            fieldName: 'skillId',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Nombre',
            fieldName: 'name',
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
          (row: Skill) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/general/skills/edit/' + row.skillId)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Skill) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.skillId)}
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

type Props = SkillPaginatedResponse & {
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
