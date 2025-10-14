"use client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-black text-white">
          <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded">
              <h2 className="text-lg font-semibold">Admin features disabled</h2>
              <p className="text-sm text-gray-300">The backend API has been removed from this repository. Admin functionality (login, pages, blog management) is currently disabled. Restore from backups in <code className="bg-black px-1">backups/backup-2025-10-14_0001/</code> to re-enable server features.</p>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}