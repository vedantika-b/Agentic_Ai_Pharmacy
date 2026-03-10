import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green to-accent-green flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary-green mb-4">
            Welcome to MedFlow
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Pharmacy Dashboard System
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Admin Card */}
          <Link href="/auth/admin/login">
            <div className="group cursor-pointer bg-gradient-to-br from-primary-green to-accent-green rounded-xl p-8 text-white hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Admin Login</h3>
                <p className="text-sm opacity-90">
                  Access admin dashboard to manage pharmacy operations
                </p>
              </div>
            </div>
          </Link>

          {/* User Card */}
          <Link href="/auth/user/login">
            <div className="group cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">User Login</h3>
                <p className="text-sm opacity-90">
                  Login to order medicines and access AI features
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary-green mb-2">AI-Powered</div>
            <p className="text-gray-600 text-sm">OCR & Chatbot</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary-green mb-2">Real-time</div>
            <p className="text-gray-600 text-sm">Order Tracking</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary-green mb-2">Smart</div>
            <p className="text-gray-600 text-sm">Inventory Management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
