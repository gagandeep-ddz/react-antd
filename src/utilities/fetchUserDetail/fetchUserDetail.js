import { useSelector } from "react-redux";

const useFetchUserDetail = (firstName, dob) => {
  const allUsers = useSelector((state) => state.user.allUsers);
  if (firstName && dob) {
    let filteredUser;
    filteredUser = allUsers.filter(
      (obj) => obj.firstName == firstName && obj.birthDate == dob
    );
    let address = filteredUser[0].address;
    address = {
      key: 0,
      ...address,
    };
    return address;
  } else {
    return null;
  }
};

export default useFetchUserDetail;
