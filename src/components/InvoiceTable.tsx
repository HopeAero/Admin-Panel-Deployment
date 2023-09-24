import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

export interface InvoiceItem {
  productId: number
  description: string
  quantity: number
  price: number
}

type Props = {
  items: InvoiceItem[]
  discountAmount: string
}

function padNumber(str: string): string {
  if (str[0] === '.') {
    str = '0' + str
  } else if (str[str.length - 1] === '.') {
    str = str + '0'
  }

  return str
}

function isNumeric(str: string): boolean {
  let regex = /^[0-9]+(\.[0-9]+)?$/
  return regex.test(str)
}

function toNumber(str: string): number {
  return +str
}

const InvoiceTable: React.FC<Props> = ({ items, discountAmount }) => {
  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )
  let total = subtotal
  if (isNumeric(padNumber(discountAmount))) {
    total = subtotal - toNumber(padNumber(discountAmount))
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align='right'>Cantidad</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='right'>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.productId}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell align='right'>{item.quantity}</TableCell>
              <TableCell align='right'>${item.price.toFixed(2)}</TableCell>
              <TableCell align='right'>
                ${(item.quantity * item.price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {isNumeric(padNumber(discountAmount)) &&
            toNumber(padNumber(discountAmount)) !== 0 && (
              <>
                <TableRow>
                  <TableCell colSpan={4} align='right'>
                    <Typography variant='subtitle1'>Subtotal:</Typography>
                  </TableCell>
                  <TableCell align='right'>${subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align='right'>
                    <Typography variant='subtitle1'>Descuento:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    - ${toNumber(padNumber(discountAmount)).toFixed(2)}
                  </TableCell>
                </TableRow>
              </>
            )}

          <TableRow>
            <TableCell colSpan={4} align='right'>
              <Typography variant='subtitle1'>Total:</Typography>
            </TableCell>
            <TableCell align='right'>${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InvoiceTable
