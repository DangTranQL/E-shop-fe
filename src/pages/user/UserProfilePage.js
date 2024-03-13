import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Profile from "../../features/user/Profile";
import useAuth from "../../hooks/useAuth";

function UserProfilePage() {
  const user = useAuth().user
  console.log("USER", user)
  // const dispatch = useDispatch();
  // const { selectedUser, isLoading } = useSelector(
  //   (state) => state.user,
  //   shallowEqual
  // );

  // useEffect(() => {
  //   console.log("USERID", userId)
  //   if (userId) {
  //     dispatch(getCurrentUserProfile());
  //   }
  // }, []);

  return (
    <Container>
        <>
          {user && <Profile profile={user} />}
        </>
    </Container>
  );
}

export default UserProfilePage;