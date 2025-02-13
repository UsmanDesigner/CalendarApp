import { useEffect, useState } from "react";

const SidebarComponent = () => {
  const [activePath, setActivePath] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);

      const handleRouteChange = () => setActivePath(window.location.pathname);
      window.addEventListener("popstate", handleRouteChange);

      return () => window.removeEventListener("popstate", handleRouteChange);
    }
  }, []);

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/schedule", label: "Schedules" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white/20 backdrop-blur-lg p-5 flex flex-col gap-3">
      {links.map(({ path, label }) => (
        <a
          key={path}
          href={path}
          className={`link p-2 px-4 rounded-md transition ${
            activePath === path ? "bg-[#EFF2F6] font-semibold shadow" : ""
          }`}
        >
          {label}
        </a>
      ))}
    </aside>
  );
};

export default SidebarComponent;
