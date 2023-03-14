import React from "react";
import moment from "moment";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import UrlTable from "../../components/UrlTable/UrlTable";

import httpClient from "../../Services/httpClient";

import "./Dashboard.css";
import { UrlType } from "../../types";
import { deleteUrlByUrlCode, getUrlsForUser } from "../../Services/urlServices";

const Dashboard = () => {
  const [showUrlAddView, setShowUrlAddView] = React.useState(false);
  const [urlPayload, setUrlPayload] = React.useState({
    originalLink: "",
    name: "",
  });
  const [shortUrl, setShortUrl] = React.useState("");
  const [userUrlData, setUserUrlData] = React.useState<Array<UrlType>>([]);

  const postDataToApi = async () => {
    if (!urlPayload.originalLink) {
      alert("Please provide original url");
      return;
    }
    try {
      const { data } = await httpClient.post("url", urlPayload);
      console.log("data from back-end", data);
      setShortUrl(`http://localhost:5001/api/url/${data.urlCode}`);
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch urls for users
  const fetchUrlsForUser = async () => {
    try {
      const urlData = await getUrlsForUser();

      setUserUrlData(urlData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUrlsForUser();
  }, []);
  const renderEmptyState = () => {
    return (
      <div className="dashboard__empty-state">
        <p>You don’t have any short url</p>
        <Button
          onClick={() => setShowUrlAddView(true)}
          label="Create a new short url"
          variant="outlined-primary"
        />
      </div>
    );
  };

  const renderAddNewUrl = () => {
    return (
      <div className="dashbard__add-new">
        <TextInput
          label="Original Url"
          placeholder="https://google.com/test/12"
          value={urlPayload.originalLink}
          onChange={(val) =>
            setUrlPayload({ ...urlPayload, originalLink: val.toLocaleString() })
          }
        />
        <TextInput
          label="Name"
          value={urlPayload.name}
          placeholder="Online shopping"
          onChange={(val) =>
            setUrlPayload({ ...urlPayload, name: val.toLocaleString() })
          }
        />
        <div className="dashboard__add-new-actions">
          <Button
            label="Generate a short url"
            onClick={() => postDataToApi()}
          />
          <Button
            label="Cancel"
            variant="outlined-secondary"
            onClick={() => setShowUrlAddView(false)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {showUrlAddView ? renderAddNewUrl() : renderEmptyState()}
      {Boolean(shortUrl) && <h3>{shortUrl}</h3>}
      <h3>Shortened url list</h3>
      <>
        <UrlTable
          columns={tableColumn}
          rows={userUrlData.map(convertRowDataToTableData)}
        />
      </>
    </div>
  );
};

const tableColumn = [
  { label: "Name", field: "name" },
  { label: "Link", field: "urlCode" },
  { label: "Visit", field: "visitCount" },
  { label: "Added date", field: "createdAt" },
  { label: "Actions", field: "actions", hideLabelinMobile: true },
];

const convertRowDataToTableData = (data: UrlType) => {
  return {
    ...data,
    urlCode: `http://localhost:5001/api/url/${data.urlCode}`,
    createdAt: moment.unix(Number(data.createdAt) / 1000).format("l"),
    actions: renderActions(data),
  };
};
//delete url
const deleteUrl = async (urlCode: string) => {
  await deleteUrlByUrlCode(urlCode);
};

const renderActions = (data: UrlType): React.ReactNode => {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 140,
        justifyContent: "space-between",
      }}
    >
      <Button
        label="Edit"
        variant="outlined-primary"
        onClick={() => console.log(data)}
      />
      <Button
        label="Delete"
        variant="outlined-secondary"
        onClick={() => deleteUrl(data.urlCode)}
      />
    </div>
  );
};

export default Dashboard;
