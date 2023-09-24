import { OrderDetail } from "core/order-activities/types";
import { FormikHelpers } from "formik";


export type FormValues = {
  clientId: number;
  walletId: number;
  products: OrderDetail[];
  submit: string | null;    
};

export interface Props {
  isUpdate?: boolean;
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
}

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;
