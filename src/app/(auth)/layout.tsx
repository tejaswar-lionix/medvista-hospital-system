export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-green-700">MedVista</h1>
          <p className="text-sm text-muted-foreground">
            Hospital Management System
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
