import NavBar from "../components/dashboard/nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen p-10">
      <div className="w-full flex-none">
        <NavBar />
      </div>
      <div className="p-12">{children}</div>
    </div>
  );
}
