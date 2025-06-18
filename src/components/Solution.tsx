
import { Check } from "lucide-react";

const Solution = () => {
  const features = [
    {
      title: "Hydrolyzed whey",
      description: "for fast, gentle absorption"
    },
    {
      title: "Real digestive enzymes",
      description: "no stomach drama"
    },
    {
      title: "Zero lactose, zero fillers",
      description: "zero bloat"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The <span className="text-pink-500">Solution</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Science-backed ingredients that work with your body, not against it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="space-y-3 text-left">
              <p className="text-gray-700">✨ 3 clean ingredients.</p>
              <p className="text-gray-700">🥤 Mixes like a dream.</p>
              <p className="text-gray-700">🍦 Tastes like vanilla, feels like sweet relief.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
