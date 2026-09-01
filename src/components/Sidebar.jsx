import { NavLink } from "react-router-dom";
import { useSettings } from "../hooks/useSettings";
import { authService } from "../services/authService";

function Sidebar() {
  const {
    settings,
    loading
  } = useSettings();

  if (loading) {
    return (
      <aside className="sidebar">
        Loading...
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>
          {settings.appConfig.name}
        </h2>
      </div>

      <nav>
        {settings.navigation.map(
          (item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({
                isActive
              }) =>
                isActive
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      <button
        className="logout-button"
        onClick={() => {
          authService.logout();
          window.location.href =
            "/login";
        }}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;