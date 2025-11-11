import { Outlet } from "react-router";
import "../styles/main.css";

const Layout = () => {
  return (
    <div>
      <header>Main Header</header>
      <nav>Main Navigation</nav>
      <main>
        <div className="main-layout-container">
          <h1>ReactHookDebugger Local Environment</h1>
          <p>Changes will hot-reload automatically.</p>
          <Outlet />
        </div>
      </main>
      <footer>Main Footer</footer>
    </div>
  );
};

export default Layout;
