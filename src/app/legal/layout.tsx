export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-32 pb-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-16 border border-white/40">
        {children}
      </div>
    </div>
  );
}
