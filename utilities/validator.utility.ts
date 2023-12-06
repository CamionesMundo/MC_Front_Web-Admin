import * as yup from "yup";

export const validGreaterThanZero = (message: string) => {
  return yup.number().min(1, message).required(message).typeError(message);
};
