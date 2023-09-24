import { FunctionComponent, useCallback } from 'react'
import { styled } from 'styled-components'
import OrderProductsCrud from 'core/order-activities/form/order-products-crud'
import { FormControl, FormHelperText } from '@mui/material'
import useInput from './use-input'
import { OrderDetailPayload } from '../types'
import { ChangeEventOrderActivities } from '../form/types'
import { LocalOrderDetail } from '../types'

const OrderProductsCrudField: FunctionComponent<Props> = ({
  inputServices,
  onChange,
  onHandleFormChange,
  fieldName,
  error,
  helperText,
  orderId,
  isParentUpdate
}) => {
  const onChangeOrderDetails = useCallback(
    (products: OrderDetailPayload[]) => {
      onChange?.(products)

      const changeEventOrderActivities = createChangeEvent(fieldName, products)
      onHandleFormChange(changeEventOrderActivities)
    },
    [fieldName, onChange, onHandleFormChange]
  )

  const { items, onDelete, onUpdate, onCreate } = useInput(
    orderId,
    inputServices,
    onChangeOrderDetails
  )

  return (
    <FormControl error={error} fullWidth>
      <OrderProductsCrud
        isParentUpdate={isParentUpdate}
        orderId={orderId}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreate={onCreate}
        items={items}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

interface Props {
  helperText?: string
  error?: boolean
  fieldName: string
  className?: string
  inputServices: LocalOrderDetail[]
  onChange?: (services: OrderDetailPayload[]) => void
  onHandleFormChange: (services: ChangeEventOrderActivities) => void
  orderId: number
  isParentUpdate?: boolean
}

function createChangeEvent(
  fieldName: string,
  products: OrderDetailPayload[]
): ChangeEventOrderActivities {
  return {
    target: {
      name: fieldName,
      id: fieldName,
      value: products
    }
  } as unknown as ChangeEventOrderActivities
}

export default styled(OrderProductsCrudField)``
