import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">

      <h1 className="text-center mb-5">
        Welcome to FarmFlo
      </h1>

      <div className="row">

        <div className="col-md-4">
          <div
            className="card shadow p-5 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login?role=farmer")}
          >
            <h1>👨‍🌾</h1>

            <h3>Farmer</h3>

            <p>
              Sell your farm products directly to consumers.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow p-5 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login?role=consumer")}
          >
            <h1>🛒</h1>

            <h3>Consumer</h3>

            <p>
              Buy fresh products directly from farmers.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow p-5 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login?role=admin")}
          >
            <h1>🛡️</h1>

            <h3>Admin</h3>

            <p>
              Manage marketplace users, products and orders.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RoleSelection;