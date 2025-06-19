import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // 1. Guardar en base de datos
      const { data, error } = await supabase
        .from('email_signups')
        .insert([{ email, source: 'cta' }]);
      
      if (error) throw error;

      // 2. Enviar email de bienvenida
      await supabase.functions.invoke('send-welcome-email', {
        body: { email }
      });
      
      setIsSubmitted(true);
      setEmail('');
      
      toast({
        title: "¡Estás en la lista de espera! 🎉",
        description: "Te notificaremos cuando HELWA FLAT esté disponible.",
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Error registering email');
      toast({
        title: "Error ❌",
        description: "Hubo un problema. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="space-y-8">
            <div className="text-6xl">💕</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              ¡Bienvenida a la familia HELWA!
            </h2>
            
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Revisa tu email para confirmar tu suscripción y recibir actualizaciones exclusivas sobre HELWA FLAT.
            </p>

            <div className="flex justify-center space-x-8 text-pink-200">
              <div className="text-center">
                <div className="text-2xl font-bold">0%</div>
                <div className="text-sm">Bloating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Natural</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">250+</div>
                <div className="text-sm">Women Tested</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            Sweeten your routine.
            <br />
            Stay <span className="text-pink-200">flat</span>.
          </h2>
          
          <p className="text-xl text-pink-100 max-w-2xl mx-auto">
            Join 250+ women already waiting for the protein that finally gets it right.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 rounded-full bg-white border-0 text-gray-900 placeholder:text-gray-500"
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit"
              className="h-14 px-8 bg-white text-pink-600 hover:bg-gray-100 rounded-full font-bold text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Get Notified"}
            </Button>
          </form>

          {error && (
            <p className="text-pink-100 text-sm">
              {error}
            </p>
          )}

          <div className="flex justify-center space-x-8 text-pink-200">
            <div className="text-center">
              <div className="text-2xl font-bold">0%</div>
              <div className="text-sm">Bloating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Natural</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">250+</div>
              <div className="text-sm">Women Tested</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;