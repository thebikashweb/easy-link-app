import React from "react";
import moment from "moment";
import Modal from "react-modal";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import UrlTable from "../../components/UrlTable/UrlTable";

import httpClient from "../../Services/httpClient";

import "./Dashboard.css";
import { UrlType } from "../../types";
import {
  createUrl,
  deleteUrlByUrlCode,
  getUrlsForUser,
  updateUrlCode,
} from "../../Services/urlServices";

const Dashboard = () => {
  const [showUrlAddView, setShowUrlAddView] = React.useState(false);
  const [urlPayload, setUrlPayload] = React.useState({
    originalLink: "",
    name: "",
  });
  const [userUrlData, setUserUrlData] = React.useState<Array<UrlType>>([]);
  const [editUrlData, setEditUrlData] = React.useState<Partial<UrlType>>();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const postDataToApi = async () => {
    if (!urlPayload.originalLink) {
      alert("Please provide original url");
      return;
    }
    await createUrl(urlPayload);
    fetchUrlsForUser();
    setShowUrlAddView(false);
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
  const renderAddNewButton = () => {
    if (showUrlAddView) return;
    return (
      <div className="dashboard__addNew">
        <Button
          onClick={() => setShowUrlAddView(true)}
          label="Create a new short url"
          variant="primary"
        />
      </div>
    );
  };

  const renderEditModal = () => {
    const onCancel = () => {
      setIsEditDialogOpen(false);
      setEditUrlData({});
    };
    return (
      <Modal
        isOpen={isEditDialogOpen}
        onRequestClose={onCancel}
        style={modalStyle}
      >
        <h3 style={{ marginBottom: 20 }}>Edit {editUrlData?.name}</h3>
        <TextInput
          style={{ marginBottom: 10 }}
          label="Original Url"
          placeholder="https://google.com/test/12"
          value={editUrlData?.originalLink || ""}
          onChange={(val) =>
            setEditUrlData({
              ...editUrlData,
              originalLink: val.toLocaleString(),
            })
          }
        />
        <TextInput
          label="Name"
          placeholder="Another short url"
          value={editUrlData?.name || ""}
          onChange={(val) =>
            setEditUrlData({
              ...editUrlData,
              name: val.toLocaleString(),
            })
          }
        />
        <div
          style={{ marginTop: 20, display: "flex", flexDirection: "column" }}
        >
          <Button
            label="Update"
            onClick={async () => {
              if (editUrlData?.urlCode) {
                await updateUrlCode(editUrlData);
                alert("Updated successfully");
                fetchUrlsForUser();
                onCancel();
              }
            }}
            variant="outlined-primary"
            style={{ marginBottom: 10 }}
          />
          <Button
            label="Cancel"
            onClick={onCancel}
            variant="outlined-secondary"
          />
        </div>
      </Modal>
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
      {showUrlAddView && renderAddNewUrl()}
      {Boolean(userUrlData.length) ? renderAddNewButton() : renderEmptyState()}

      {Boolean(userUrlData.length) && (
        <>
          {renderEditModal()} <h3>Shortened url list</h3>
          <UrlTable
            columns={tableColumn}
            rows={userUrlData.map((_) =>
              convertRowDataToTableData(_, setEditUrlData, setIsEditDialogOpen)
            )}
          />
        </>
      )}
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

const convertRowDataToTableData = (
  data: UrlType,
  setEditUrlData: React.Dispatch<
    React.SetStateAction<Partial<UrlType> | undefined>
  >,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return {
    ...data,
    urlCode: `http://localhost:5001/api/url/${data.urlCode}`,
    createdAt: moment.unix(Number(data.createdAt) / 1000).format("l"),
    actions: renderActions(data, setEditUrlData, setIsEditDialogOpen),
  };
};
//delete url
const deleteUrl = async (urlCode: string) => {
  await deleteUrlByUrlCode(urlCode);
};

const renderActions = (
  data: UrlType,
  setEditUrlData: React.Dispatch<
    React.SetStateAction<Partial<UrlType> | undefined>
  >,
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
): React.ReactNode => {
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
        onClick={() => {
          setEditUrlData(data);
          setIsEditDialogOpen(true);
        }}
      />
      <Button
        label="Delete"
        variant="outlined-secondary"
        onClick={() => {
          if (
            window.confirm(`Are you sure you want to delete: ${data.name}?`)
          ) {
            deleteUrl(data.urlCode);
          }
        }}
      />
    </div>
  );
};
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxWidth: 500,
    width: "100%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, .5)",
  },
};

export default Dashboard;
