import { cn } from "@/lib/utils";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { authFormValidationSchema } from "@/validators/auth.validators";
import useRegister from "@/hooks/useRegister";

export function RegisterForm({ className, ...props }) {
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    mutate(
      {
        email: values.email,
        password: values.password,
        organizationName: values.organizationName,
      },
      {
        onSuccess: async () => {
          resetForm();
          navigate("/login");
        },
      },
    );
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Register your account</CardTitle>
              <CardDescription>
                Enter your email below to Register your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  organizationName: "",
                }}
                validationSchema={authFormValidationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleChange,
                  setFieldValue,
                  values,
                  errors,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="email">
                          Organization Name
                        </FieldLabel>
                        <Input
                          id="organizationName"
                          name="organizationName"
                          type="text"
                          placeholder="Jio"
                          value={values.organizationName}
                          onChange={(event) =>
                            setFieldValue(
                              "organizationName",
                              event.target.value,
                            )
                          }
                          required
                        />
                        {errors.organizationName && (
                          <FieldDescription className="text-destructive">
                            {errors.organizationName}
                          </FieldDescription>
                        )}
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="m@example.com"
                          value={values.email}
                          onChange={(event) =>
                            setFieldValue("email", event.target.value)
                          }
                          required
                        />
                        {errors.email && (
                          <FieldDescription className="text-destructive">
                            {errors.email}
                          </FieldDescription>
                        )}
                      </Field>
                      <Field>
                        <div className="flex items-center">
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          required
                        />
                        {errors.password && (
                          <FieldDescription className="text-destructive">
                            {errors.password}
                          </FieldDescription>
                        )}
                      </Field>
                      <Field>
                        <Button type="submit" disabled={isPending}>
                          {isPending ? "Please wait..." : "Register"}
                        </Button>
                        <FieldDescription className="text-center">
                          Already have an account?{" "}
                          <Link
                            to="/login"
                            className="underline-offset-4 hover:underline"
                          >
                            Sign in
                          </Link>
                        </FieldDescription>
                      </Field>
                    </FieldGroup>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
