import { useSelector } from "react-redux";

const useFetchUserDetail = (firstName, dob) => {
  const allUsers = useSelector((state) => state.user.allUsers);
  if (firstName && dob) {
    let filteredUser;
    filteredUser = allUsers.filter(
      (obj) => obj.firstName == firstName && obj.birthDate == dob
    );

    return filteredUser[0].address;
  } else {
    return null;
  }
};

export default useFetchUserDetail;
