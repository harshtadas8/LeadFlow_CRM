import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

/**
 * Component for creating a new lead entry.
 * Includes form validation and duplicate phone number handling.
 */
const CreateLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    source: "other",
    status: "new",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Submits lead data to the backend.
   * Captures specific validation errors from the server response.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/leads", formData, {
        headers: { "x-api-key": "my_secret_key" },
      });
      navigate(`/leads/${response.data._id}`);
    } catch (err) {
      // PRO TIP: Extract the specific message sent by leadController.js
      const serverErrorMessage = err.response?.data?.message;

      if (err.response?.status === 409) {
        // Handle your specific redirect logic for duplicates
        alert(serverErrorMessage || "Lead already exists! Redirecting...");
        navigate(`/leads/${err.response.data.leadId}`);
      } else {
        // Display the exact validation error from the server (Production style)
        setError(serverErrorMessage || "Failed to create lead. Please check your inputs.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: "550px", margin: "20px auto", paddingBottom: "40px" }}
    >
      <header style={{ marginBottom: "24px", textAlign: "left" }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>Add New Lead</h1>
        <p
          style={{
            color: "var(--text)",
            margin: "4px 0 0 0",
            fontSize: "14px",
          }}
        >
          Enter details to register a new potential client.
        </p>
      </header>

      {error && (
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "var(--danger)",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "13px",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            textAlign: "left" 
          }}
        >
          <strong>Validation Error:</strong> {error}
        </div>
      )}

      <div className="card" style={{ padding: "20px" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                fontSize: "13px",
                color: "var(--text-h)",
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ fontSize: "14px" }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                fontSize: "13px",
                color: "var(--text-h)",
              }}
            >
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ fontSize: "14px" }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                fontSize: "13px",
                color: "var(--text-h)",
              }}
            >
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Mumbai"
              value={formData.city}
              onChange={handleChange}
              style={{ fontSize: "14px" }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              textAlign: "left",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  fontSize: "13px",
                  color: "var(--text-h)",
                }}
              >
                Source
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              >
                <option value="website">Website</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="referral">Referral</option>
                <option value="ads">Ads</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  fontSize: "13px",
                  color: "var(--text-h)",
                }}
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              >
                <option value="new">New</option>
                <option value="follow_up">Follow Up</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              marginTop: "5px",
              height: "40px",
              fontSize: "14px",
              backgroundColor: "var(--accent)",
            }}
          >
            {loading ? "Creating Lead..." : "Save Lead Entry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLead;