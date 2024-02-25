import React from "react";
import { Box, Grid, Card, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";

const UpdateUserSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
});

function AccountGeneral() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || null,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="username" label="Username" />
              <FTextField name="email" label="Email" disabled />

              <FTextField name="phone" label="Phone" />
              <FTextField name="address" label="Address" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;