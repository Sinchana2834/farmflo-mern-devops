import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/authService";

function Profile() {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        setFormData({
          name: response.user?.name || "",
          phone: response.user?.phone || "",
          address: response.user?.address || "",
          password: "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(formData);
      localStorage.setItem("user", JSON.stringify(response.user));
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-success mb-4">👤 My Profile</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;