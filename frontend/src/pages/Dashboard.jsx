import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

/**
 * Dashboard component for managing and visualizing leads.
 * Supports dynamic searching, multi-criteria filtering, and CSV data export.
 */
const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (statusFilter) params.append("status", statusFilter);
        if (sourceFilter) params.append("source", sourceFilter);

        const response = await api.get(`/leads?${params.toString()}`);
        setLeads(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    // Implements debouncing to minimize redundant API requests
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter, sourceFilter, navigate]);

  /**
   * Triggers a browser download of the current lead list in CSV format.
   */
  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ["Name", "Phone", "City", "Source", "Status", "Created At"];
    const rows = leads.map((lead) => [
      lead.name,
      `"${lead.phone}"`,
      lead.city || "",
      lead.source,
      lead.status,
      new Date(lead.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ marginTop: "20px", paddingBottom: "40px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h1 style={{ margin: 0, fontSize: "28px" }}>Leads</h1>
          <p
            style={{
              color: "var(--text)",
              margin: "4px 0 0 0",
              fontSize: "14px",
            }}
          >
            Manage your team's potential customers and follow-ups.
          </p>
        </div>
        <div className="btn-group" style={{ display: "flex", gap: "12px" }}>
          <button onClick={exportToCSV} className="btn btn-outline">
            Export CSV
          </button>
          <Link
            to="/leads/new"
            className="btn btn-primary"
            style={{ backgroundColor: "var(--accent)" }}
          >
            + Add Lead
          </Link>
        </div>
      </header>

      <div
        className="card filter-bar"
        style={{
          marginBottom: "24px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 2 }}>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="follow_up">Follow Up</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="referral">Referral</option>
            <option value="ads">Ads</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>City</th>
              <th>Source</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td style={{ fontWeight: "600", color: "var(--text-h)" }}>
                  {lead.name}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{lead.phone}</td>
                <td>{lead.city || "-"}</td>
                <td style={{ textTransform: "capitalize" }}>{lead.source}</td>
                <td>
                  <span className={`badge badge-${lead.status}`}>
                    {lead.status.replace("_", " ")}
                  </span>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <Link
                    to={`/leads/${lead._id}`}
                    className="btn btn-outline"
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "var(--text)",
                  }}
                >
                  No leads found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;