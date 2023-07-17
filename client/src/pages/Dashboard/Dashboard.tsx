import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import Modal from "react-modal";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import UrlTable from "../../components/UrlTable/UrlTable";

import "./Dashboard.css";
import { UrlType } from "../../types";
import { updateUrlCode } from "../../Services/urlServices";
import urlStore from "../../store/urlStore";
import snackBarStore from "../../components/common/Snackbar/store/snackBarStore";

const Dashboard = observer(() => {
  const [editUrlData, setEditUrlData] = React.useState<Partial<UrlType>>();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const {
    urlData,
    urlDataLoading,
    newUrlPayload,
    init,
    createNewUrl,
    showUrlAddView,
    setShowUrlAddView,
  } = urlStore;

  React.useEffect(() => {
    init();
  }, [init]);

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
                snackBarStore.showSnackBar("Updated successfully");

                urlStore.fetchUrlsForUser();
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
          value={newUrlPayload.originalLink}
          onChange={(val) =>
            (newUrlPayload.originalLink = val.toLocaleString())
          }
        />
        <TextInput
          label="Name"
          value={newUrlPayload.name || ""}
          placeholder="Online shopping"
          onChange={(val) => (newUrlPayload.name = val.toLocaleString())}
        />
        <div className="dashboard__add-new-actions">
          <Button
            label="Generate a short url"
            onClick={() => {
              createNewUrl();
            }}
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
      {Boolean(urlData.length) ? renderAddNewButton() : renderEmptyState()}
      {urlDataLoading && <h2>Loading...</h2>}

      {Boolean(urlData.length) && !urlDataLoading && (
        <>
          {renderEditModal()} <h3>Shortened url list</h3>
          <UrlTable
            columns={tableColumn}
            rows={urlData.map((_) =>
              convertRowDataToTableData(_, setEditUrlData, setIsEditDialogOpen)
            )}
          />
        </>
      )}
    </div>
  );
});

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
            urlStore.deleteUrl(data.urlCode);
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
