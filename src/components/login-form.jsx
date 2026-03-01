import useLogin from "@/hooks/userLogin";
import { cn } from "@/lib/utils";
import { authFormValidationSchema } from "@/validators/auth.validators";
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

export function LoginForm({ className, ...props }) {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async (data) => {
          localStorage.setItem("authToken", data.token);
          resetForm();
          navigate("/dashboard");
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
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
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
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
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
                          {isPending ? "Please wait..." : "Login"}
                        </Button>
                        <FieldDescription className="text-center">
                          Don&apos;t have an account?{" "}
                          <Link
                            to="/register"
                            className="underline-offset-4 hover:underline"
                          >
                            Sign up
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
