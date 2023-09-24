import { FunctionComponent } from 'react'
// material-ui
import MainCard from 'components/cards/MainCard'
import { Props } from './types'
import InvoiceTable from 'components/InvoiceTable'

const Detail: FunctionComponent<Props> = ({ className, bill, onRefresh }) => {
  return (
    <div className={className}>
      <div className={'container-form-employees'}>
        <MainCard
          className={'form-data activities-crud'}
          contentClass={'form-content'}
          title={'Detalle'}
        >
          <InvoiceTable
            items={bill.items}
            discountAmount={bill.discountAmount.toString()}
          />
        </MainCard>
        <MainCard
          className={'form-data'}
          contentClass={'form-content'}
          title={'Información Adicional'}
        >
          <h4>Nombre de Cliente:</h4>
          <div>{bill.clientName}</div>
          <h4>Depositado en:</h4>
          <div>{bill?.walletId}</div>
          {(!!bill.mainPhone || !!bill.secondaryPhone) && (
            <>
              <h4>Contacto:</h4>
              {!!bill.mainPhone && (
                <div>
                  {'Principal: ' +
                    bill.mainPhone?.slice(0, 4) +
                    ' ' +
                    bill.mainPhone?.slice(4, 7) +
                    ' ' +
                    bill.mainPhone?.slice(7, 11)}
                </div>
              )}
              {!!bill.secondaryPhone && (
                <div>
                  {'Secundario: ' +
                    bill.secondaryPhone?.slice(0, 4) +
                    ' ' +
                    bill.secondaryPhone?.slice(4, 7) +
                    ' ' +
                    bill.secondaryPhone?.slice(7, 11)}
                </div>
              )}
            </>
          )}
          <h4>Descripción:</h4>
          {!!bill.description
            ? bill.description
            : 'No se ha provisto una descripción para esta venta..'}
        </MainCard>
      </div>
    </div>
  )
}

export default Detail
