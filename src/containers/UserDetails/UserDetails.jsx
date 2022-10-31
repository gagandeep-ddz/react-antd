import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Table from "../../components/Table/Table";
import { selectedUserColumns, userDetailColumns } from "./columns";

import useFetchUserDetail from "../../utilities/fetchUserDetail/fetchUserDetail";

const UserDetails = () => {
  const user = useSelector((state) => state.user.currentUser);

  const userDetail = useFetchUserDetail(user.firstName, user.birthDate);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetail) {
      navigate(
        "/error/Oh Crap! The state is not Persisted/Fetch User Again/users"
      );
    }
  }, []);

  return (
    <>
      <Table
        columns={selectedUserColumns}
        data={[user]}
        isDownloadable={false}
        isPrintable={false}
      />
      <Table
        columns={userDetailColumns}
        data={[userDetail]}
        isDownloadable={false}
        isPrintable={false}
      />
    </>
  );
};

export default UserDetails;
