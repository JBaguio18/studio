export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container grid min-h-[calc(100vh-8rem)] place-items-center py-10">
      {children}
    </div>
  );
}
