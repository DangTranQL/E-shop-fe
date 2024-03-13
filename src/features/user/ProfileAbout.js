import { styled } from "@mui/material/styles";
import { Link, Card, Typography, CardHeader, Stack, Box } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import EmailIcon from "@mui/icons-material/Email";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfileAbout({ profile }) {
  const { username, email, address, phone } = profile;

  return (
    <Card>
      <CardHeader title="About" variant="h6" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{username}</Typography>

        <Stack direction="row">
          <IconStyle>
            <PinDropIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {address} {phone}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle>
            <EmailIcon />
          </IconStyle>
          <Typography variant="body2">{email}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileAbout;