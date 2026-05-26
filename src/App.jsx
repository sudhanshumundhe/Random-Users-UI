import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const API =
    "https://api.freeapi.app/api/v1/public/randomusers";

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch(API);
      const json = await res.json();
      setUsers(json?.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = users.filter((u) =>
    `${u.name.first} ${u.name.last}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">

      {/* HERO */}
      <header className="hero">
        <div className="hero-eyebrow">User Explorer</div>

        <h1 className="hero-title">
          Discover <em>People</em>
          <br />
          Around the World
        </h1>

        <p className="hero-sub">Browse · Search · Explore</p>
      </header>

      {/* CONTROLS */}
      <div className="controls">
        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


      </div>

      {/* GRID */}
      <div className="grid-wrap">

        {!loading && (
          <p className="result-count">
            {filtered.length} users found
          </p>
        )}

        {loading ? (
          <div className="grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div className="card" key={i}>
                <div className="skel card-img-wrap" />
                <div className="card-body">
                  <div className="skel" style={{ height: 14, marginBottom: 8 }} />
                  <div className="skel" style={{ height: 12, width: "70%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid">
            {filtered.map((u) => (
              <div
                key={u.login.uuid}
                className="card"
                onClick={() => setSelected(u)}
              >
                <div className="card-img-wrap">
                  <img
                    src={u.picture.large}
                    alt={u.name.first}
                    className="card-img"
                  />
                  <span className="card-area">
                    {u.location.country}
                  </span>
                </div>

                <div className="card-body">
                  <h3 className="card-name">
                    {u.name.first} {u.name.last}
                  </h3>

                  <div className="card-tags">
                    <span className="tag">{u.gender}</span>
                    <span className="tag">{u.email.slice(0, 10)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              className="modal-img"
              src={selected.picture.large}
              alt=""
            />

            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <div className="modal-body">
              <div className="modal-meta">
                <span className="modal-area-badge">
                  {selected.location.country}
                </span>

                <span className="modal-area-badge">
                  {selected.gender}
                </span>
              </div>

              <h2 className="modal-title">
                {selected.name.first} {selected.name.last}
              </h2>

              <p className="instructions">
                📧 {selected.email}
                <br />
                📞 {selected.phone}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}