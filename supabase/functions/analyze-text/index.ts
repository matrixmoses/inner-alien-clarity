import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reason, customReason, taskDetails } = await req.json();

    // Initialize OpenAI
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    let prompt = `As a productivity assistant, analyze this procrastination situation and provide helpful advice. 
    Task: ${taskDetails.task_name}
    Reason: ${reason}${customReason ? ` (${customReason})` : ''}
    
    Provide:
    1. A brief analysis of why this might be happening
    2. Specific, actionable steps to overcome this
    3. A motivational message
    
    Format the response in JSON with these keys: analysis, steps (as an array), motivation`;

    console.log('Sending prompt to OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a supportive productivity assistant.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const aiFeedback = JSON.parse(data.choices[0].message.content);
    console.log('Parsed AI feedback:', aiFeedback);

    return new Response(JSON.stringify(aiFeedback), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-text function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});