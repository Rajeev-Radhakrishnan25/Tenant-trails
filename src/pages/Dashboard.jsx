import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ApartmentCard from "../components/ApartmentCard";
import apartments from "../data/mockData";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const welcomeMessage = location.state?.message;

  const [search, setSearch] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("All Neighbourhoods");
  const [sort, setSort] = useState("Highest Rated");
  const [showMessage, setShowMessage] = useState(!!welcomeMessage);

  // Get unique neighbourhoods
  const neighbourhoods = [
    "All Neighbourhoods",
    ...new Set(apartments.map((a) => a.neighbourhood)),
  ];

  // Filter and sort apartments
  const filtered = useMemo(() => {
    let result = [...apartments];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q) ||
          a.neighbourhood.toLowerCase().includes(q)
      );
    }

    // Neighbourhood filter
    if (neighbourhood !== "All Neighbourhoods") {
      result = result.filter((a) => a.neighbourhood === neighbourhood);
    }

    // Sort
    if (sort === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "Lowest Rated") {
      result.sort((a, b) => a.rating - b.rating);
    } else if (sort === "Most Reviews") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === "Name A–Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, neighbourhood, sort]);

  // Compute stats
  const totalReviews = apartments.reduce((sum, a) => sum + a.reviewCount, 0);
  const totalNeighbourhoods = new Set(apartments.map((a) => a.neighbourhood)).size;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Get user initials for avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-nav">
        <span className="dashboard-nav-logo">TenantTrails</span>
        <div className="dashboard-search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="dashboard-search"
            placeholder="Search apartments by address or neighbourhood..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dashboard-nav-user">
          <div className="user-avatar">{initials}</div>
          <span className="user-name">{user?.name}</span>
          <button className="sign-out-btn" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome message (from navigation state) */}
        {showMessage && welcomeMessage && (
          <div className="welcome-banner">
            {welcomeMessage}
            <button
              className="dismiss-btn"
              onClick={() => setShowMessage(false)}
            >
              ✕
            </button>
          </div>
        )}

        <h1 className="dashboard-title">Apartments in Halifax</h1>
        <p className="dashboard-subtitle">
          Honest reviews from real tenants. Read before you rent.
        </p>

        {/* Stats */}
        <div className="stats-row">
          <span className="stat-badge">
            <strong>{apartments.length}</strong> apartments
          </span>
          <span className="stat-badge">
            <strong>{totalReviews}</strong> reviews
          </span>
          <span className="stat-badge">
            <strong>{totalNeighbourhoods}</strong> neighbourhoods
          </span>
        </div>

        {/* Filters */}
        <div className="filters-row">
          <select
            className="filter-select"
            value={neighbourhood}
            onChange={(e) => setNeighbourhood(e.target.value)}
          >
            {neighbourhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
            <option>Most Reviews</option>
            <option>Name A–Z</option>
          </select>
        </div>

        {/* Apartment Grid */}
        {filtered.length > 0 ? (
          <div className="apartment-grid">
            {filtered.map((apt) => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No apartments match your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
