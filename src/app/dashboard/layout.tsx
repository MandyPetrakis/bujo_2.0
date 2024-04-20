import NavBar from "../components/dashboard/nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="h-screen bg-light w-[100px] fixed border-r">
        <NavBar />
      </div>
      <div className="pl-[120px] pr-[20px] w-full h-screen">{children}</div>
    </div>
  );
}
