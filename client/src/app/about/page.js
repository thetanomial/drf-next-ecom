export default function AboutPage() {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <div className="bg-white py-20 px-6 text-center shadow-sm">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We’re on a mission to empower developers and creators with tools that matter.
          </p>
        </div>
  
        {/* Mission and Story */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2025, we started as a small team of passionate engineers building tools
                for developers. Since then, we’ve grown into a community-focused company dedicated
                to creating quality software with beautiful user experiences.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To simplify complex tech with intuitive design and robust functionality—bridging the
                gap between ideas and implementation.
              </p>
            </div>
          </div>
        </section>
  
        {/* Core Values / Team */}
        <section className="bg-white py-16 px-6">
          <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div className="p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600">We communicate openly and honestly in everything we do.</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">We’re not afraid to push boundaries and try new things.</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
              <p className="text-gray-600">We help others grow and succeed with our tools and support.</p>
            </div>
          </div>
        </section>
  
        {/* Footer Note */}
        <div className="text-center py-10 text-sm text-gray-500">
          © 2025 YourCompany — All Rights Reserved.
        </div>
      </div>
    );
  }
  