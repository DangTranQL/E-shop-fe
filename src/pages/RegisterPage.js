import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FSelect, FTextField, FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate as RouterLink, useNavigate} from "react-router-dom";
import { Alert, Container, IconButton, InputAdornment, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
    passwordConfirmation: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password")], "Passwords must match"),
    address: Yup.string().required("Address is required"),
    phone: Yup.number().required("Phone is required"),
});

const defaultValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
    address: "",
    phone: null,
};

function RegisterPage() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordComfirmation, setShowPasswordConfirmation] = useState(false);

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const { handleSubmit, reset, setError, formState: { errors, isSubmitting } } = methods;

    const onSubmit = async (data) => {
        const { username, email, password, role, address, phone } = data;

        try {
            await auth.register({ username, email, password, role, address, phone }, () => {
                navigate("/", { replace: true });
            });
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    }

    return (
        <Container maxWidth="xs">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2.5}>
                    {!!errors.responseError && (
                        <Alert severity="error">{errors.responseError.message}</Alert>
                    )}
                    <Alert severity="info">
                        Already have an account?{" "}
                        <Link variant="subtitle2" component={RouterLink} to="/login">
                            Login
                        </Link>
                    </Alert>

                    <FTextField name="username" label="Username" />
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

                    <FTextField
                        name="passwordConfirmation"
                        label="Confirm Password"
                        type={showPasswordComfirmation ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPasswordConfirmation(!showPasswordComfirmation)}
                                        edge="end"
                                    >
                                        {showPasswordComfirmation ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FSelect name="role">
                        {[
                            { value: "buyer", label: "Buyer" },
                            { value: "seller", label: "Seller" },
                        ].map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </FSelect>
                    <FTextField name="address" label="Address" />
                    <FTextField name="phone" label="Phone" type="number" />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Register
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Container>
    );
}

export default RegisterPage;