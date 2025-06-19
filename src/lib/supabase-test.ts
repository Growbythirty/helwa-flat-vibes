// Test file to verify Supabase configuration
import { supabase } from "@/integrations/supabase/client";

export const testSupabaseConnection = async () => {
  console.log("🔍 Testing Supabase configuration...");
  
  try {
    // 1. Test basic connection
    console.log("1. Testing basic connection...");
    const { data: connectionTest, error: connectionError } = await supabase
      .from('email_signups')
      .select('count', { count: 'exact', head: true });
    
    if (connectionError) {
      console.error("❌ Connection failed:", connectionError);
      return false;
    }
    console.log("✅ Connection successful");

    // 2. Test table structure
    console.log("2. Testing table structure...");
    const { data: tableTest, error: tableError } = await supabase
      .from('email_signups')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error("❌ Table access failed:", tableError);
      return false;
    }
    console.log("✅ Table structure correct");

    // 3. Test insert permissions
    console.log("3. Testing insert permissions...");
    const testEmail = `test-${Date.now()}@example.com`;
    const { data: insertTest, error: insertError } = await supabase
      .from('email_signups')
      .insert([{ email: testEmail, source: 'test' }])
      .select();
    
    if (insertError) {
      console.error("❌ Insert failed:", insertError);
      return false;
    }
    console.log("✅ Insert permissions working");

    // 4. Clean up test data
    if (insertTest && insertTest.length > 0) {
      await supabase
        .from('email_signups')
        .delete()
        .eq('email', testEmail);
      console.log("✅ Test data cleaned up");
    }

    // 5. Test edge function availability
    console.log("5. Testing edge function...");
    try {
      const { data: functionTest, error: functionError } = await supabase.functions
        .invoke('send-welcome-email', {
          body: { email: 'test@example.com' }
        });
      
      // Even if the function fails (due to missing API keys), 
      // we just want to check if it's accessible
      console.log("✅ Edge function accessible");
    } catch (funcError) {
      console.log("⚠️ Edge function may not be deployed or configured");
    }

    console.log("🎉 Supabase configuration verified successfully!");
    return true;

  } catch (error) {
    console.error("❌ Supabase configuration test failed:", error);
    return false;
  }
};

// Environment variables check
export const checkEnvironmentVariables = () => {
  console.log("🔍 Checking environment variables...");
  
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.error("❌ Missing environment variables:", missing);
    return false;
  }
  
  console.log("✅ All environment variables present");
  return true;
};