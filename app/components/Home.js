import AuthWrapper from "./components/AuthWrapper";

export default function Home() {
  return (
    <AuthWrapper>
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    </AuthWrapper>
  );
}
