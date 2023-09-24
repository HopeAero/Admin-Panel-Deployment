import MainCard from 'components/cards/MainCard'
import { Typography } from '@mui/material'
import { styled } from 'styled-components'
import { FunctionComponent } from 'react'
import useOverviewInfo from './use-info'

const GeneralBalance: FunctionComponent<Prop> = ({ className }) => {
  const { items } = useOverviewInfo()

  return (
    <div className={className}>
      <MainCard>
        <Typography variant='h3' component='h3'>
          Balance General
        </Typography>
      </MainCard>

      <MainCard className={'form-data'} title={'Vista General'}>
        <div className={'grid-container'}>
          <div>
            <div>
              <h4>Patrimonio Neto</h4>
              <div>$ {items?.netWorth}</div>
            </div>
            <div>
              <h4>Balance de Efectivo</h4>
              <div>$ {items?.generalBalance}</div>
            </div>
          </div>
          <div>
            <div>
              <h4>Valor Total de Inventario Restante</h4>
              <div>$ {items?.inventoryValue}</div>
            </div>

            <div>
              <h4>Cantidad de Productos Restante en Inventario</h4>
              <div>{items?.productsQuantity}</div>
            </div>
            {!!items?.incommingProducts && (
              <div>
                <h4>Cantidad de Productos En Camino</h4>
                <div>{items?.incommingProducts}</div>
              </div>
            )}
          </div>
        </div>
      </MainCard>
    </div>
  )
}

interface Prop {
  className?: string
}

export default styled(GeneralBalance)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .form-data {
    margin-top: 16px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
  }

  @media screen and (max-width: 768px) {
    /* media query para dispositivos móviles */
    .grid-container {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
  }
`
