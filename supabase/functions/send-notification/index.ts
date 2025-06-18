
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailSignupRequest {
  email: string;
  source: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source }: EmailSignupRequest = await req.json();
    
    console.log(`Processing email signup: ${email} from ${source}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store email in database
    const { error: insertError } = await supabase
      .from('email_signups')
      .insert({ email, source });

    if (insertError) {
      console.error('Database error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Error storing email' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "HELWA FLAT <onboarding@resend.dev>",
      to: [email],
      subject: "¡Bienvenida a la familia HELWA! 💕",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 2.5em; margin: 0;">HELWA FLAT</h1>
            <p style="color: #666; font-size: 1.1em;">La proteína que no te hincha</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <h2 style="color: #ec4899; text-align: center; margin-bottom: 20px;">¡Gracias por unirte! 🎉</h2>
            <p style="color: #374151; font-size: 1.1em; line-height: 1.6; text-align: center;">
              Serás la primera en saber cuando <strong>HELWA FLAT</strong> esté disponible.
            </p>
            <p style="color: #374151; font-size: 1.1em; line-height: 1.6; text-align: center;">
              La proteína que finalmente entiende a las mujeres: <strong>0% hinchazón, 100% natural</strong>.
            </p>
          </div>

          <div style="background: #fff; padding: 25px; border-radius: 10px; border-left: 4px solid #ec4899; margin-bottom: 30px;">
            <h3 style="color: #ec4899; margin-top: 0;">¿Qué puedes esperar?</h3>
            <ul style="color: #374151; line-height: 1.8;">
              <li>✨ Acceso prioritario al lanzamiento</li>
              <li>💕 Descuentos exclusivos para early adopters</li>
              <li>📱 Actualizaciones sobre el desarrollo del producto</li>
              <li>🎁 Sorpresas especiales para nuestra comunidad</li>
            </ul>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <p style="color: #666; font-size: 1.1em;">
              Únete a más de <strong>250+ mujeres</strong> que ya están esperando HELWA FLAT
            </p>
          </div>

          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 0.9em;">
              Con amor,<br>
              <strong style="color: #ec4899;">El equipo HELWA FLAT</strong>
            </p>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "HELWA FLAT <onboarding@resend.dev>",
      to: ["depianteyasmeen@gmail.com"],
      subject: `🎉 Nueva suscripción desde ${source.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 2em;">HELWA FLAT Admin</h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #fdf2f8 100%); padding: 25px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #059669; margin-top: 0;">¡Nueva suscripción! 🎉</h2>
            <p style="color: #374151; font-size: 1.1em; margin-bottom: 15px;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="color: #374151; font-size: 1.1em; margin-bottom: 15px;">
              <strong>Fuente:</strong> ${source === 'hero' ? 'Sección Hero' : 'Call to Action'}
            </p>
            <p style="color: #374151; font-size: 1.1em; margin-bottom: 0;">
              <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}
            </p>
          </div>

          <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="color: #666; margin: 0; text-align: center;">
              Este email se envía automáticamente cada vez que alguien se suscribe a HELWA FLAT.
            </p>
          </div>
        </div>
      `,
    });

    console.log("User email sent:", userEmailResponse);
    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully",
        userEmailId: userEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
