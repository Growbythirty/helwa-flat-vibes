
const Problem = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Ever sip a protein shake and feel... <span className="text-pink-500">puffy?</span>
          </h2>
          
          <div className="bg-pink-50 rounded-2xl p-8 space-y-6">
            <div className="text-6xl font-bold text-pink-400">47%</div>
            <p className="text-xl text-gray-700 font-medium">
              of women told us they quit protein because of bloating.
            </p>
            <p className="text-lg text-gray-600">
              We made <span className="font-bold text-pink-500">HELWA FLAT</span> to change that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <p className="text-gray-700 italic text-lg">
                "Every other protein made me feel pregnant."
              </p>
              <p className="text-sm text-gray-500 mt-2">— Survey respondent</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <p className="text-gray-700 italic text-lg">
                "This is the first one that doesn't upset my stomach."
              </p>
              <p className="text-sm text-gray-500 mt-2">— Survey respondent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
