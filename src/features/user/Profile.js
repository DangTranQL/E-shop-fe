import { Grid, Stack } from "@mui/material";
import ProfileAbout from "./ProfileAbout";

function Profile({ profile }) {
  return (
    <Grid item xs={12} md={4}>
        <Stack spacing={3}>
            <ProfileAbout profile={profile} />
        </Stack>
    </Grid>
  );
}

export default Profile;