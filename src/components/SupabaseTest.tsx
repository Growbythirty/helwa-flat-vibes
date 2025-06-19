import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testSupabaseConnection, checkEnvironmentVariables } from "@/lib/supabase-test";

const SupabaseTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const runTests = async () => {
    setIsLoading(true);
    setResults([]);
    
    // Capture console logs
    const originalLog = console.log;
    const originalError = console.error;
    const logs: string[] = [];
    
    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };
    
    console.error = (...args) => {
      logs.push(`ERROR: ${args.join(' ')}`);
      originalError(...args);
    };

    try {
      // Check environment variables
      checkEnvironmentVariables();
      
      // Test Supabase connection
      await testSupabaseConnection();
      
    } catch (error) {
      logs.push(`FATAL ERROR: ${error}`);
    } finally {
      // Restore console
      console.log = originalLog;
      console.error = originalError;
      
      setResults(logs);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">🔧 Supabase Configuration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runTests} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Running Tests..." : "Test Supabase Configuration"}
        </Button>
        
        {results.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`text-sm font-mono ${
                  result.includes('ERROR') || result.includes('❌') 
                    ? 'text-red-600' 
                    : result.includes('✅') 
                    ? 'text-green-600'
                    : result.includes('⚠️')
                    ? 'text-yellow-600'
                    : 'text-gray-700'
                }`}
              >
                {result}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseTest;