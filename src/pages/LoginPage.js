import React, { useState } from "react";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Container, IconButton, InputAdornment, Link, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

function LoginPage () {
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setError, formState: { errors, isSubmitting } } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await auth.login({ email, password });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxwidth="xs"> 
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don't have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>

          <FTextField name="email" label="Email" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2}}>
          <FCheckbox name="rememberMe" label="Remember me" />
          <Link component={RouterLink} to="/" variant="subtitle2">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton> 
      </FormProvider>
    </Container>
  )
}

export default LoginPage;