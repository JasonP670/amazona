import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  detailsUser,
  selectUserData,
  selectUserDetails,
  selectUserError,
  selectUserLoading,
} from "../slices/userSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const user = useSelector(selectUserDetails);
  const error = useSelector(selectUserError);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(detailsUser(userData.id));
  }, [dispatch, userData]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update profile
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {!loading && !error && (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={user.name}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter email"
                value={user.email}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="text" placeholder="Enter password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="text"
                placeholder="Enter Confirm password"
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
