import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-ink text-paper px-6">
      <div className="grid-bg opacity-30"></div>
      <div className="vignette"></div>
      
      <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-mono font-bold text-paper mb-4 relative z-10 tracking-tight">
        CONTACT
      </h1>
      <p className="text-fog font-mono text-sm mb-8 relative z-10">Work in progress...</p>
      
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center pt-[clamp(18px,3vw,32px)] px-[clamp(24px,6vw,96px)] font-mono text-xs tracking-widest text-fog pointer-events-none">
        <Link href="/" className="hover:text-paper transition-colors pointer-events-auto">
          &lt; BACK HOME
        </Link>
      </header>
    </div>
  );
}
