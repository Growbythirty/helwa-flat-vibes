import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // 1. Save to database
      const { data, error } = await supabase
        .from('email_signups')
        .insert([{ email, source: 'hero' }]);
      
      if (error) throw error;

      // 2. Send welcome email
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { email }
        });
      } catch (emailError) {
        console.log('Email function error (non-critical):', emailError);
        // Don't fail the whole process if email fails
      }
      
      setIsSubmitted(true);
      setEmail('');
      
      toast({
        title: "You're on the list! 🎉",
        description: "We'll notify you when HELWA FLAT is available.",
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Error registering email');
      toast({
        title: "Error ❌",
        description: "There was a problem. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="text-6xl">🎉</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Thank you for joining!
          </h1>
          <p className="text-xl text-gray-600">
            You'll be the first to know when <span className="font-bold text-pink-500">HELWA FLAT</span> is available.
          </p>
          <div className="bg-pink-50 rounded-2xl p-6">
            <p className="text-gray-700">
              Check your email to confirm your subscription and receive exclusive updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Finally the protein that{" "}
              <span className="text-pink-500">doesn't bloat</span> you.
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Scientifically designed for women.
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-lg text-gray-700">
              Meet <span className="font-bold text-pink-500">HELWA FLAT</span>—the protein that keeps your tummy as flat as your vibe.
            </p>
            <p className="text-base text-gray-600">
              Protein that keeps you light. No bloat. No drama.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 rounded-full border-2 border-pink-200 focus:border-pink-400"
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit"
              className="h-12 px-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Get Notified"}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-sm text-center lg:text-left">
              {error}
            </p>
          )}
          
          <p className="text-sm text-gray-500">
            Be the first to have HELWA FLAT. Join 250+ women already waiting.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-40 bg-white rounded-2xl shadow-lg mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-500 mb-2">HELWA</div>
                    <div className="text-lg font-semibold text-gray-700">FLAT</div>
                    <div className="text-xs text-gray-500 mt-1">PROTEIN</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">Vanilla Cream</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-200 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;