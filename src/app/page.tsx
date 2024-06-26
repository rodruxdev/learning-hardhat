import Header from "@/components/Header/Header";
import Landing from "@/components/Landing/Landing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header></Header>
      <Landing></Landing>
    </main>
  );
}
