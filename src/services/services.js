import { users } from "../api/api";

const FETCH_USERS = async () => {
  const data = await fetch(users).then((res) => res.json());
  return data.users;
};

export { FETCH_USERS };
