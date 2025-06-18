
const Proof = () => {
  const stats = [
    {
      number: "0%",
      label: "reported bloating",
      subtitle: "Clinically tested"
    },
    {
      number: "250+",
      label: "women surveyed",
      subtitle: "Built with the UAE"
    },
    {
      number: "100%",
      label: "nutritionist approved",
      subtitle: "Trusted by experts"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The <span className="text-pink-500">Proof</span>
          </h2>
          <p className="text-xl text-gray-600">
            Real results from real women.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-pink-50 rounded-2xl p-8">
              <div className="text-5xl font-bold text-pink-500 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.subtitle}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8">
              <p className="text-lg text-gray-800 italic mb-4">
                "Every other protein made me feel heavy. HELWA FLAT is just... light."
              </p>
              <p className="text-sm text-gray-600">— Sarah M., Dubai</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
              <p className="text-lg text-gray-800 italic mb-4">
                "Now my workout ends as sweet—and as flat—as it started."
              </p>
              <p className="text-sm text-gray-600">— Layla K., Abu Dhabi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
