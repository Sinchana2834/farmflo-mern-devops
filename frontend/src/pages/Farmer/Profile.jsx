import { useState } from "react";

function Profile() {
  const [farmer, setFarmer] = useState({
    name: "Ramesh Gowda",
    email: "ramesh@gmail.com",
    phone: "9876543210",
    farmName: "Green Valley Farm",
    address: "Nelamangala, Bangalore Rural",
    experience: "8 Years",
  });

  const handleChange = (e) => {
    setFarmer({
      ...farmer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h2 className="text-center text-success mb-4">
          👨‍🌾 Farmer Profile
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={farmer.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={farmer.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={farmer.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Farm Name</label>
            <input
              type="text"
              name="farmName"
              className="form-control"
              value={farmer.farmName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Farm Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              value={farmer.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Experience</label>
            <input
              type="text"
              name="experience"
              className="form-control"
              value={farmer.experience}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
}

export default Profile;