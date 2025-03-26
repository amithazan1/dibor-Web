import { useState } from "react";

const PictureUpload = ({ onImageChange }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        if (onImageChange) {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center">
      <label htmlFor="profileImageInput" className="d-inline-block">
        <img
          src={profileImage || "./profilePic-defaul.png"}
          alt="Profile"
          className="rounded-circle border shadow-lg"
          style={{ width: "100px", height: "100px", cursor: "pointer" }}
        />
      </label>
      <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        className="d-none"
        onChange={handleImageChange}
        required={true}
      />
    </div>
  );
};

export default PictureUpload;
