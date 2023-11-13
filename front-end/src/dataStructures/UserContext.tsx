import { createContext, useContext } from "react";

export type UserContent = {
  username: string | null;
  setUsername: (username: string | null) => void;
};

export const UserContext = createContext<UserContent>({
  username: null,
  setUsername: () => {},
});

export const useUserContext = () => useContext(UserContext);
