import { FunctionComponent, useCallback } from 'react'
import MainCard from 'components/cards/MainCard'
import Table from './table'
import usePaginate from './use-paginate'
import { useNavigate } from 'react-router'
import { styled } from 'styled-components'
import { Button, Typography } from '@mui/material'
import { IconCirclePlus } from '@tabler/icons'

const ClientsPage: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const { clients, paginate, setPage, fetchClients } = usePaginate()

  const goToCreate = useCallback(() => {
    navigate('/clientela/clients/create')
  }, [navigate])

  return (
    <MainCard
      className={className}
      headerClass={'clients-header'}
      title={
        <div className={'clients-header'}>
          <Typography variant='h3' className={'title-header'}>
            Clientes
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
        items={clients}
        paginate={paginate}
        onChange={setPage}
        fetchItems={fetchClients}
      />
    </MainCard>
  )
}

interface Props {
  className?: string
}

export default styled(ClientsPage)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .clients-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`
