// material-ui

import MainCard from 'components/cards/MainCard'
import Table from './table'
import usePaginate from './use-paginate'
import { Button, Typography } from '@mui/material'
import { IconCirclePlus } from '@tabler/icons'
import { styled } from 'styled-components'
import { FunctionComponent, useCallback } from 'react'
import { useNavigate } from 'react-router'

const Movements: FunctionComponent<Prop> = ({ className }) => {
  const { items, paginate, setPage, fetchMovements } = usePaginate()
  const navigate = useNavigate()

  const goToCreate = useCallback(() => {
    navigate('/general/movements/create')
  }, [navigate])

  return (
    <MainCard
      className={className}
      headerClass={'movements-header'}
      title={
        <div className={'movements-header'}>
          <Typography variant='h3' className={'title-header'}>
            Movimientos Internos
          </Typography>
          <Button
            color='primary'
            variant={'outlined'}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
          >
            Crear
          </Button>
        </div>
      }
    >
      <Table
        items={items}
        paginate={paginate}
        onChange={setPage}
        fetchItems={fetchMovements}
      />
    </MainCard>
  )
}

interface Prop {
  className?: string
}

export default styled(Movements)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .movements-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`
