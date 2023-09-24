import { Bill } from 'core/bills/types'
import { Button, Pagination } from '@mui/material'
import DynamicTable from 'components/DynamicTable'
import styled from 'styled-components'
import { FunctionComponent } from 'react'
import { PaginateData } from 'services/types'
import { IconEye } from '@tabler/icons'
import { useNavigate } from 'react-router'

const Table: FunctionComponent<Prop> = ({
  items,
  paginate,
  className,
  onChange,
  fetchItems
}) => {
  const navigate = useNavigate()

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: 'ID',
            fieldName: 'billId',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Cliente',
            fieldName: 'clientName',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'ID de Orden',
            fieldName: 'orderId',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'SubTotal',
            cellAlignment: 'left',
            onRender: (row: Bill) => (row.subtotal ? '$' + row.subtotal : '')
          },
          {
            columnLabel: 'Descuento',
            cellAlignment: 'left',
            onRender: (row: Bill) =>
              row.discountAmount ? '$' + row.discountAmount : ''
          },
          {
            columnLabel: 'Coste Total',
            cellAlignment: 'left',
            onRender: (row: Bill) => (row.totalCost ? '$' + row.totalCost : '')
          },
          {
            columnLabel: 'Fecha de Emisión',
            fieldName: 'createdAt',
            cellAlignment: 'left'
          }
        ]}
        rows={items}
        components={[
          (row: Bill) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/clientela/bills/edit/' + row.billId)
              }}
              startIcon={<IconEye />}
            >
              Editar
            </Button>
          ),
          (row: Bill) => (
            <Button
              color='secondary'
              onClick={() => {
                navigate('/clientela/bills/detail/' + row.billId)
              }}
              startIcon={<IconEye />}
            >
              Detalle
            </Button>
          )
        ]}
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
  items: Bill[]
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
