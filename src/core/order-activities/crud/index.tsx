import { FunctionComponent, useCallback } from 'react'
import { styled } from 'styled-components'
import OrderActivitiesCrud from 'core/order-activities/form/order-products-crud'
import { FormControl } from '@mui/material'
import { OrderDetail } from '../types'
import { LocalOrderDetail } from '../types'
import deleteOrderDetail from 'services/order-activities/delete-order-activity'
import editOrderDetail from 'services/order-activities/edit-order-activity'
import { OrderDetailFormValues } from '../form/form'
import createOrderActivity from 'services/order-activities/create-order-activity'
import { useAppDispatch } from 'store'
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
// import { Booking } from 'core/bookings/types'

const OrderActivitiesCrudWrapper: FunctionComponent<Props> = ({
  className,
  onRefresh,
  items,
  orderId
}) => {
  const dispatch = useAppDispatch()

  const onDelete = useCallback(
    async (product: LocalOrderDetail, index: number) => {
      try {
        dispatch(setIsLoading(true))
        await deleteOrderDetail(orderId, product.productId, product.quantity)
        dispatch(
          setSuccessMessage(
            `El producto de la orden ha sido eliminado correctamente`
          )
        )
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()))
      } finally {
        dispatch(setIsLoading(false))
        onRefresh()
      }
    },
    [dispatch, orderId, onRefresh]
  )

  const onUpdate = useCallback(
    async (
      orderActivity: LocalOrderDetail,
      formValues: OrderDetailFormValues,
      index: number
    ) => {
      try {
        await editOrderDetail(orderId, orderActivity.productId, {
          quantity: +formValues.quantity
        })
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()))
      } finally {
        dispatch(setIsLoading(false))
        onRefresh()
      }
    },
    [dispatch, orderId, onRefresh]
  )

  const onCreate = useCallback(
    async (formValues: OrderDetailFormValues) => {
      try {
        await createOrderActivity({
          orderId,
          productId: +formValues.productId!!,
          quantity: +formValues.quantity
        })
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()))
      } finally {
        dispatch(setIsLoading(false))
        onRefresh()
      }
    },
    [dispatch, orderId, onRefresh]
  )

  return (
    <FormControl className={className} fullWidth>
      <OrderActivitiesCrud
        isParentUpdate={true}
        orderId={orderId}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreate={onCreate}
        items={items}
      />
    </FormControl>
  )
}

interface Props {
  className?: string
  orderId: number
  onRefresh: () => void
  items: OrderDetail[]
}

export default styled(OrderActivitiesCrudWrapper)``
