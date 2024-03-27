import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import apiService from "../../app/apiService";
import { Alert, Container, Stack } from "@mui/material";
import { FSelect, FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";

const CreateProductSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    stocks: Yup.number().required("Stocks is required"),
    price: Yup.number().required("Price is required"),
    image: Yup.string().required("Image is required"),
});

const defaultValues = {
    title: "",
    description: "",
    category: "",
    stocks: null,
    price: null,
    image: "",
};

function CreateProduct() {
    const methods = useForm({
        resolver: yupResolver(CreateProductSchema),
        defaultValues,
    });

    const { handleSubmit, reset, setError, formState: { errors, isSubmitting } } = methods;

    const onSubmit = async (data) => {
        const { title, description, category, stocks, price, image } = data;

        try {
            await apiService.post("/admin/products", { title, description, category, stocks, price, image });
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    }

    return (
        <Container maxWidth="xs">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2.5} mt={5}>
                    {!!errors.responseError && (
                        <Alert severity="error">{errors.responseError.message}</Alert>
                    )}

                    <FTextField name="title" label="Title" />
                    <FTextField name="description" label="Description" />

                    <FSelect name="category">
                        {[
                            { value: "electronics", label: "Electronics" },
                            { value: "clothing", label: "Clothing" },
                            { value: "medicine", label: "Medicine"},
                            { value: "food", label: "Food" },
                        ].map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </FSelect>

                    <FTextField name="stocks" label="Stocks" type="number" />
                    <FTextField name="price" label="Price" type="number" />
                    <FTextField name="image" label="Image" />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Create
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Container>
    );
}

export default CreateProduct;