import { FunctionComponent, useState, useCallback } from 'react'
// material-ui
import styled from 'styled-components'
import { Box, Button, Fade, Modal } from '@mui/material'
import { IconCirclePlus } from '@tabler/icons'
import OrderProductsList from './order-products-list'
import MainCard from 'components/cards/MainCard'
import Form, { OrderDetailFormValues } from './form'
import { FormikHelpers } from 'formik'
import { LocalOrderDetail } from '../types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  boxShadow: 'none',
  p: 0
}

const DEFAULT_INITIAL_VALUE: OrderDetailFormValues = {
  productId: null,
  quantity: 0,
  submit: null
}

const RecommendedServicesCrud: FunctionComponent<Props> = ({
  className,
  items,
  onDelete,
  onUpdate,
  onCreate,
  orderId,
  isParentUpdate
}) => {
  //const isCreated = !isUpdate;
  const [open, setOpen] = useState(false)
  const [initialValue, setInitialValue] =
    useState<OrderDetailFormValues | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const isUpdate = selectedIndex !== null

  const closeModal = useCallback(() => {
    setOpen(false)
    setInitialValue(null)
    setSelectedIndex(null)
  }, [])

  const openCreateModal = useCallback(() => {
    setOpen(true)
    setInitialValue({ ...DEFAULT_INITIAL_VALUE })
    setSelectedIndex(null)
  }, [])

  const openEditModal = useCallback(
    (orderActivity: LocalOrderDetail, index: number) => {
      setOpen(true)
      setInitialValue({
        productId: +orderActivity.productId,
        quantity: +orderActivity.quantity,
        submit: null
      })
      setSelectedIndex(index)
    },
    []
  )
  return (
    <>
      <MainCard
        className={className}
        headerClass={'page-header-container'}
        title={
          <div className={'page-header'}>
            <span>Productos de Orden</span>
            <Button
              color='primary'
              size='small'
              // disabled={!booking}
              variant={'outlined'}
              onClick={openCreateModal}
              startIcon={<IconCirclePlus />}
            >
              Añadir Producto
            </Button>
          </div>
        }
      >
        <OrderProductsList
          orderId={orderId}
          isParentUpdate={isParentUpdate}
          items={items}
          onEdit={openEditModal}
          onDelete={onDelete}
        />
      </MainCard>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fade in={open}>
          <Box sx={style}>
            <MainCard
              className={className}
              title={
                isUpdate
                  ? 'Editar Producto de Orden'
                  : 'Añadir Producto a Orden'
              }
            >
              {open && initialValue && (
                <Form
                  // agencyRif={booking.agencyRif}
                  isParentUpdate={isParentUpdate}
                  onSubmit={(
                    values: OrderDetailFormValues,
                    helpers: FormikHelpers<OrderDetailFormValues>
                  ) => {
                    if (isUpdate && selectedIndex !== null) {
                      onUpdate(items[selectedIndex], values, selectedIndex)
                    } else {
                      onCreate(values)
                    }
                    closeModal()
                  }}
                  initialValues={initialValue}
                  isUpdate={isUpdate}
                />
              )}
            </MainCard>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

interface Props {
  isParentUpdate?: boolean
  className?: string
  isUpdate?: boolean
  items: LocalOrderDetail[]
  orderId?: number | null
  onDelete: (item: LocalOrderDetail, index: number) => void
  onUpdate: (
    item: LocalOrderDetail,
    formValues: OrderDetailFormValues,
    index: number
  ) => void
  onCreate: (formValues: OrderDetailFormValues) => void
}

export default styled(RecommendedServicesCrud)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .page-header-container {
    padding-bottom: 18.5px;
  }

  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`
