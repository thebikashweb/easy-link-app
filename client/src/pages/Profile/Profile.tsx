import React from "react";
import { observer } from "mobx-react";

import "./Profile.css";
import userStore from "../../store/userStore";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/common/SelectInput/SelectInput";
import { UserRole } from "../../types";
const Profile = observer(() => {
  const [isEditing, setIsEditing] = React.useState(false);

  let { init, user, updateUser } = userStore;

  React.useEffect(() => {
    init();
  }, [init]);

  const renderProfileEdit = () => (
    <>
      <TextInput
        label="Profile image url"
        placeholder="http://image.url.com"
        value={user.avatar || ""}
        onChange={(val) => (user.avatar = val.toString())}
      />
      <TextInput
        label="Full name"
        placeholder="John Doe"
        value={user.fullName || ""}
        onChange={(val) => (user.fullName = val.toString())}
      />
      <SelectInput
        label="User role"
        value={user.role || "user"}
        options={userRoleOption}
        onChange={(val) => (user.role = val.toString() as UserRole)}
      />
    </>
  );
  const renderProfile = () => (
    <div className="profile-page__profile">
      <img
        src={user.avatar || "https://via.placeholder.com/600/92c952"}
        alt=" user"
      />
      <p>{user.fullName}</p>
      <p>{user.email}</p>
    </div>
  );

  const userRoleOption: Array<{ label: string; value: UserRole }> = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];
  return (
    <div className="profile-page">
      <h3>Profile page</h3>

      <div className="profile-page__info">
        {!isEditing && renderProfile()}
        {isEditing && renderProfileEdit()}
      </div>
      <div className="profile-page__action">
        {isEditing && (
          <>
            <Button
              variant="outlined-secondary"
              label="Cancel"
              onClick={() => setIsEditing(false)}
            />
            <Button
              variant="outlined-primary"
              label="Update"
              onClick={async () => {
                await updateUser();
                setIsEditing(false);
              }}
            />
          </>
        )}
        {!isEditing && (
          <Button
            variant="outlined-primary"
            label="Edit profile"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
    </div>
  );
});

export default Profile;
