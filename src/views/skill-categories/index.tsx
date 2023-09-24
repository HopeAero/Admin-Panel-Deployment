// material-ui

import MainCard from 'components/cards/MainCard'
import Table from './table'
import usePaginate from './use-paginate'
import { Button, Typography } from '@mui/material'
import { IconCirclePlus } from '@tabler/icons'
import { styled } from 'styled-components'
import { FunctionComponent, useCallback } from 'react'
import { useNavigate } from 'react-router'

const SkillCategories: FunctionComponent<Prop> = ({ className }) => {
  const { items, paginate, setPage, fetchSkillCategories } = usePaginate()
  const navigate = useNavigate()

  const goToCreate = useCallback(() => {
    navigate('/general/skill-categories/create')
  }, [navigate])

  return (
    <MainCard
      className={className}
      headerClass={'wallets-header'}
      title={
        <div className={'wallets-header'}>
          <Typography variant='h3' className={'title-header'}>
            Categorias de Habilidades
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
        fetchItems={fetchSkillCategories}
      />
    </MainCard>
  )
}

interface Prop {
  className?: string
}

export default styled(SkillCategories)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .wallets-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`
