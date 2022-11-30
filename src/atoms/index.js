import { atom } from "recoil";
export const loginStatus = atom({
  key: "loginStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const userData = atom({
  key: "userData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
