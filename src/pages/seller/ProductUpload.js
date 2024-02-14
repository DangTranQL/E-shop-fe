import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
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

function ProductUpload() {
    let navigate = useNavigate();
    let location = useLocation();

    const methods = useForm({
        resolver: yupResolver(ProductSchema),
        defaultValues,
    });
    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        let from = location.state?.from?.pathname || "/";
        let title = data.title;
        let description = data.description;
        let category = data.category;
        let stocks = data.stocks;
        let price = data.price;
        let image = data.image;

        console.log(data);
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ minWidth: "350px" }}>
                <Typography variant="h4" textAlign="center">
                    Add Product
                </Typography>
                <FTextField name="title" label="Title" />
                <FTextField name="description" label="Description" />
                <FTextField name="category" label="Category" />
                <FTextField name="stocks" label="Stocks" type="number" />
                <FTextField name="price" label="Price" type="number" />
                <FTextField name="image" label="Image" />
                <Button type="submit" variant="contained">
                    Add Product
                </Button>
            </Stack>
        </FormProvider>
    );
}

export default ProductUpload;