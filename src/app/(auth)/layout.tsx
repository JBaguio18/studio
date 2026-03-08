export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container max-w-md py-12">
      {children}
    </main>
  );
}
