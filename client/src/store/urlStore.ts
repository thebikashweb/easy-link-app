import { makeAutoObservable } from "mobx";
import { UrlPayloadType, UrlType } from "../types";
import {
  createUrl,
  deleteUrlByUrlCode,
  getUrlsForUser,
} from "../Services/urlServices";
import snackBarStore from "../components/common/Snackbar/store/snackBarStore";

class UrlStore {
  urlData: Array<UrlType> = [];
  urlDataLoading: boolean = false;
  showUrlAddView: boolean = false;
  newUrlPayload: UrlPayloadType = {
    originalLink: "",
    name: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    this.fetchUrlsForUser();
  };

  //Fetch urls for users
  fetchUrlsForUser = async () => {
    try {
      this.urlDataLoading = true;

      const data = await getUrlsForUser();
      this.setUrlData(data);
      this.urlDataLoading = false;
    } catch (error) {
      console.log(error);
    }
  };

  //create new url
  createNewUrl = async () => {
    try {
      if (!this.newUrlPayload.originalLink) {
        alert("Original link is required");
        return;
      }
      await createUrl(this.newUrlPayload);
      this.fetchUrlsForUser();
      this.showUrlAddView = false;
    } catch (error) {}
  };

  //delete url
  deleteUrl = async (urlCode: string) => {
    await deleteUrlByUrlCode(urlCode);
    this.fetchUrlsForUser();
    snackBarStore.showSnackBar("Deleted Successfully", "success");
  };

  setUrlData = (data: Array<UrlType>) => (this.urlData = data);

  setShowUrlAddView = (val: boolean) => (this.showUrlAddView = val);
}

const urlStore = new UrlStore();
export default urlStore;
