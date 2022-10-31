import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAllUsers, updateCurrentUser } from "../../reducers/userReducer";
import { FETCH_USERS } from "../../services/services";

import { Button } from "antd";

import Table from "../../components/Table/Table";
import printableColumns from "./printableColumns";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let users;
    try {
      users = await FETCH_USERS();
      users = users.map((item) => ({
        key: item.id,
        ...item,
      }));
      dispatch(updateAllUsers(users));
    } catch {
      navigate("/error/There was some problem Fetching Data/Try Again/users");
    }
  };

  const onClickHandler = (data) => {
    dispatch(updateCurrentUser(data));
    navigate("/user-details");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: 150,
      fixed: "left",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 150,
    },
    {
      title: "Date of Birth",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 150,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
      width: 150,
    },
    {
      title: "Eye Color",
      dataIndex: "eyeColor",
      key: "eyeColor",
      width: 150,
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      width: 150,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Button type="primary" onClick={() => onClickHandler(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={users}
      isPrintable
      isDownloadable
      printableColumns={printableColumns}
    />
  );
};

export default Users;
