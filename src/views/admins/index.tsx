// material-ui

import MainCard from 'components/cards/MainCard'
import Table from './table'
import usePaginate from './use-paginate'
import { Button, Typography } from '@mui/material'
import { IconCirclePlus } from '@tabler/icons'
import { styled } from 'styled-components'
import { FunctionComponent, useCallback } from 'react'
import { useNavigate } from 'react-router'

const Admins: FunctionComponent<Prop> = ({ className }) => {
  const { items, paginate, setPage, fetchAdmins } = usePaginate()
  const navigate = useNavigate()

  const goToCreate = useCallback(() => {
    navigate('/business/admins/create')
  }, [navigate])

  return (
    <MainCard
      className={className}
      headerClass={'admins-header'}
      title={
        <div className={'admins-header'}>
          <Typography variant='h3' className={'title-header'}>
            Administradores
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
        fetchItems={fetchAdmins}
      />
    </MainCard>
  )
}

interface Prop {
  className?: string
}

export default styled(Admins)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .admins-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`
