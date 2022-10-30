import { useSelector } from "react-redux";

const useFetchUserDetail = (firstName, dob) => {
  let filteredUser;
  const allUsers = useSelector((state) => state.user.allUsers);
  filteredUser = allUsers.filter(
    (obj) => obj.firstName == firstName && obj.birthDate == dob
  );

  return filteredUser[0].address;
};

export default useFetchUserDetail;
