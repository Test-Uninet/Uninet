import * as yup from "yup";

export interface NewBrandType {
  Brand: string;
  Description: string;
  Id?: string | undefined;
  Price: number;
}

export const BrandSchema: any = yup.object().shape({
  Brand: yup.string().required().label("Brand"),
  Price: yup.number().required().label("Price"),
  Description: yup.string().required().label("Description"),
});