import React from "react";
import { Container } from "@mui/material";
import Profile from "../../features/user/Profile";
import useAuth from "../../hooks/useAuth";

function UserProfilePage() {
  const user = useAuth().user

  return (
    <Container>
        <>
          {user && <Profile profile={user} />}
        </>
    </Container>
  );
}

export default UserProfilePage;