import React, { useState } from 'react';
import Avatar from 'react-avatar';

function Profile({ username: initialUsername, email: initialEmail, onAvatarChange, onProfileUpdate }) {
  const [newAvatar, setNewAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
        setNewAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    if (newAvatar) {
      onAvatarChange(previewAvatar); // Update avatar in the Home component
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Here you can add the logic to save updated username, email, and password
    console.log("Profile updated:", { username, email, password });
    onProfileUpdate({ username, email }); // Callback to update profile data in Home component
  };

  return (
    <div className="container mt-5">
      <h2 className="text-light mb-4">Profile Settings</h2>
      <div className="card bg-dark text-light p-4">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            {/* Display current avatar or uploaded one */}
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="Avatar Preview"
                className="rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <Avatar name={username} size="100" round={true} />
            )}
            <div className="ms-4">
              <h4>{username}</h4>
              <input
                type="file"
                className="form-control mt-2"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-success" onClick={saveProfile}>
              Save Changes
            </button>
            <button className="btn btn-danger" onClick={() => setNewAvatar(null)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
