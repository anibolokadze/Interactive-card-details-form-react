export interface Data {
  cardHolderName: string;
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
}
export interface ErrorStatus {
  cardHolderName: boolean;
  cardNumber: boolean;
  month: boolean;
  year: boolean;
  cvc: boolean;
}
export interface InputData {
  name: string;
  placeholder: string;
  label?: string;
  pattern?: string;
  value: string | number;
  onChange?: any;
  required?: boolean;
}
