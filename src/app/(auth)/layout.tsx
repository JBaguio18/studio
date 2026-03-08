export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] place-items-center px-4 py-10">
      {children}
    </div>
  );
}
