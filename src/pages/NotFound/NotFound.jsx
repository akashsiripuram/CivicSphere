import { Building2, Trees, Home, ArrowLeft } from 'lucide-react';

function NotFound() {
    return ( 
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center">
          <div className="mb-8 flex justify-center space-x-4">
            <Building2 className="h-16 w-16 text-green-600" strokeWidth={1.5} />
            <Trees className="h-16 w-16 text-green-700" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Sustainable Path Not Found
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Just like sustainable development, sometimes we need to find new paths forward. 
            The page you&apos;re looking for seems to have been recycled or relocated.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">Sustainable Cities</h3>
              <p className="text-gray-600 text-sm">Building resilient and inclusive urban communities</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">Green Spaces</h3>
              <p className="text-gray-600 text-sm">Creating urban forests and community gardens</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">Clean Energy</h3>
              <p className="text-gray-600 text-sm">Powering cities with renewable resources</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              Return Home
            </a>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
        
        <img
          src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80"
          alt="Sustainable city"
          className="fixed inset-0 w-full h-full object-cover -z-10 opacity-5"
        />
      </div>
     );
}

export default NotFound;