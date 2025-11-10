import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <header>Main Header</header>
      <nav>Main Navigation</nav>
      <main>
        <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
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
