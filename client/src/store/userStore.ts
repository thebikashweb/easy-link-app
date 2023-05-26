import { makeAutoObservable } from "mobx";
import { UserType } from "../types";
import { getUserById, updateUser } from "../Services/userServices";

class UserStore {
  user: Partial<UserType> = {
    id: "",
    email: "",
    avatar: "https://via.placeholder.com/600/92c952",
  };
  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    this.fetchUser();
  };

  fetchUser = async () => {
    try {
      const userData = await getUserById();
      this.user = userData;
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = async () => {
    try {
      await updateUser(this.user);
      this.fetchUser();
    } catch (error) {
      console.log(error);
    }
  };
}

const userStore = new UserStore();
export default userStore;
