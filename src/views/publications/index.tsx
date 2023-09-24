// material-ui

import MainCard from 'components/cards/MainCard'
import Table from './table'
import usePaginate from './use-paginate'
import {
  // Button,
  Typography
} from '@mui/material'
// import { IconCirclePlus } from '@tabler/icons'
import { styled } from 'styled-components'
import {
  FunctionComponent
  // useCallback
} from 'react'
// import { useNavigate } from 'react-router'

const Publications: FunctionComponent<Prop> = ({ className }) => {
  const { items, paginate, setPage, fetchPublications } = usePaginate()
  // const navigate = useNavigate()

  // const goToCreate = useCallback(() => {
  //   navigate('/general/users/create')
  // }, [navigate])

  return (
    <MainCard
      className={className}
      headerClass={'swaps-header'}
      title={
        <div className={'swaps-header'}>
          <Typography variant='h3' className={'title-header'}>
            Usuarios
          </Typography>
          {/* <Button
            color='primary'
            variant={'outlined'}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
          >
            Crear
          </Button> */}
        </div>
      }
    >
      <Table
        items={items}
        paginate={paginate}
        onChange={setPage}
        fetchItems={fetchPublications}
      />
    </MainCard>
  )
}

interface Prop {
  className?: string
}

export default styled(Publications)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .swaps-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`
