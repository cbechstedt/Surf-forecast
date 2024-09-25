import SurfDashboard from "@/components/SurfDashboard";

export default function Home() {
  return (
    <main className='sm:ml-40 p-4'>
      <h1>Surf Report</h1>
      <section>
        <SurfDashboard />
      </section>
    </main>
  );
}
