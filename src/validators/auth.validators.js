import * as yup from "yup";

export const authFormValidationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).max(18).required(),
});

export const registerFormValidationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).max(18).required(),
  organizationName: yup.string().required(),
});
