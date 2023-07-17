import { makeAutoObservable } from "mobx";

type SnackBarUrgencyType = "default" | "error" | "success";

class SnackBarStore {
  text: string = "";
  show: boolean = false;
  duration: number = 3000; //default is 3 seconds
  urgency: SnackBarUrgencyType = "default";
  constructor() {
    makeAutoObservable(this);
  }

  showSnackBar = (text: string, urgency?: SnackBarUrgencyType) => {
    this.text = text;
    if (urgency) {
      this.urgency = urgency;
    }
    this.showAndHide();
  };

  showAndHide = () => {
    this.show = true;

    setTimeout(() => {
      this.show = false;
      this.urgency = "default";
    }, this.duration);
  };
  hide = () => (this.show = false);
}
const snackBarStore = new SnackBarStore();
export default snackBarStore;
