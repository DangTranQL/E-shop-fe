import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Profile from "../../features/user/Profile";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../../features/user/userSlice";
import LoadingScreen from "../../components/LoadingScreen";
import useAuth from "../../hooks/useAuth";

function UserProfilePage() {
  const userId = useAuth().user?._id;
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    if (userId) {
      dispatch(getCurrentUserProfile());
    }
  }, []);

  console.log("SELECTEDUSER", selectedUser)

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;