import SupabaseTest from "@/components/SupabaseTest";

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Supabase Configuration Verification
        </h1>
        <SupabaseTest />
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Configuration Checklist:</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>📋</span>
              <span>Database table `email_signups` exists with correct schema</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔑</span>
              <span>Environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🛡️</span>
              <span>Row Level Security (RLS) policies configured</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Edge function `send-welcome-email` deployed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>Resend API key configured in edge function</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;