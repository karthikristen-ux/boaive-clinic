import BeforeAfter from '@/components/BeforeAfter';

export default function ResultsPage() {
  return (
    <main
      className="min-h-[calc(100vh-var(--header-height))] flex flex-col justify-center"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <BeforeAfter compact />
    </main>
  );
}
