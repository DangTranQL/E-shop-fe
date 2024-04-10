import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Stack } from "@mui/material";
import { fCurrency } from "../../utils/NumberFormat";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProductDetail } from "./productSlice";
import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FSelect, FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";

const ProductSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required"),
    stocks: Yup.number().required("Stocks is required"),
    image: Yup.string().required("Image is required"),
});

function AdminProductCard({ product }) {
    const defaultValues = {
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        stocks: product.stocks,
        image: product.image,
    };

    const buttonStyle = {backgroundColor: 'blue', color: 'white', fontSize: '0.7em', weight: 600};

    const methods = useForm({
        resolver: yupResolver(ProductSchema),
        defaultValues,
    });

    const { handleSubmit, reset, setError, formState: { isSubmitting } } = methods;

    const onSubmit = async (data) => {
        const { title, description, category, stocks, price, image } = data;

        try {
            dispatch(updateProductDetail({ id: product._id , title, description, category, stocks, price, image }));
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    }

    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
  
    const handleEdit = () => setIsEditing(true);

  return (
    <>
    {isEditing ? (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
                <FTextField name="title" defaultValue={product.title} label="Title"/>
                <FTextField name="description" defaultValue={product.description} label="Description"/>
                <FSelect name="category">
                    {[
                        { value: "eletronics", label: "Electronics" },
                        { value: "clothing", label: "Clothing" },
                        { value: "food", label: "Food" },
                        { value: "medicine", label: "Medicine" },
                    ].map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                </FSelect>
                <FTextField type="number" name="stocks" defaultValue={product.stocks} label="Stocks"/>
                <FTextField type="number" name="price" defaultValue={product.price} label="Price"/>
                <FTextField name="image" defaultValue={product.image} label="Image"/>
                <LoadingButton style={buttonStyle} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    UPDATE
                </LoadingButton>
                <LoadingButton style={buttonStyle} fullWidth size="large" variant="contained" onClick={() => setIsEditing(false)}>
                    CANCEL
                </LoadingButton>
            </Stack>
        </FormProvider>
        ) : (
        <Card sx={{ width: { xs: '100%', sm: 200 }, height: 250 }}>
            <CardActionArea>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img src={product.image} alt={product.title} height="120"/>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div" noWrap>
                        {product.title}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography variant="subtitle1">
                        Stocks: {product.stocks}
                        </Typography>
                        <Typography variant="subtitle1">
                        {fCurrency(product.price)}
                        </Typography>
                    </Stack>
                </CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                    <Button style={buttonStyle} onClick={handleEdit}>Edit</Button>
                    <Button style={buttonStyle} onClick={() => dispatch(deleteProduct(product._id))}>Delete</Button>
                </Box>
            </CardActionArea>
        </Card>
    )}
    </>
  );
}

export default AdminProductCard;