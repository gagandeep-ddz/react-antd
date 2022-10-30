import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Table from "../../components/Table/Table";
import { selectedUserColumns, userDetailColumns } from "./columns";

import useFetchUserDetail from "../../utilities/fetchUserDetail/fetchUserDetail";

const UserDetails = () => {
  const user = useSelector((state) => state.user.currentUser);

  const userDetail = useFetchUserDetail(user.firstName, user.birthDate);

  return (
    <>
      <Table columns={selectedUserColumns} data={[user]} />
      <Table columns={userDetailColumns} data={[userDetail]} />
    </>
  );
};

export default UserDetails;
