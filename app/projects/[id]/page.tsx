import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center relative px-6">
      <div className="grid-bg opacity-30 z-0"></div>
      
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center pt-[clamp(16px,4vh,32px)] px-[clamp(16px,4vw,64px)] font-mono text-xs tracking-widest text-fog pointer-events-none">
        <Link href="/projects" className="hover:text-paper transition-colors pointer-events-auto flex items-center gap-2 group">
          <span className="text-amber group-hover:-translate-x-1 transition-transform">&lt;</span> BACK TO PROJECTS
        </Link>
      </header>
      
      <div className="relative z-10 text-center">
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-bold font-sans uppercase mb-4">
          PROJECT {resolvedParams.id}
        </h1>
        <p className="text-fog font-mono text-sm tracking-widest uppercase">
          Detailed view coming soon...
        </p>
      </div>
    </div>
  );
}
