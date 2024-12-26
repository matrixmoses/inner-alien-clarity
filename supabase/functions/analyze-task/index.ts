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
    const { taskName, reason, customReason } = await req.json();
    const cohereApiKey = Deno.env.get('COHERE_API_KEY');
    
    if (!cohereApiKey) {
      throw new Error('Cohere API key not configured');
    }

    const prompt = `As a productivity assistant, analyze this procrastination situation:
    Task: ${taskName}
    Reason: ${reason}${customReason ? ` (${customReason})` : ''}
    
    Provide:
    1. A brief analysis of why this might be happening
    2. 3-5 specific, actionable steps to overcome this
    3. A motivational message
    
    Format the response in JSON with these keys: analysis, steps (as an array), motivation`;

    console.log('Sending prompt to Cohere:', prompt);

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cohereApiKey}`,
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06'
      },
      body: JSON.stringify({
        model: 'command',
        prompt,
        max_tokens: 500,
        temperature: 0.7,
        format: 'json'
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Cohere API error:', errorData);
      throw new Error('Failed to get response from Cohere');
    }

    const data = await response.json();
    console.log('Cohere response:', data);

    if (!data.generations?.[0]?.text) {
      throw new Error('Invalid response from Cohere');
    }

    // Parse the JSON response from Cohere
    const aiFeedback = JSON.parse(data.generations[0].text);
    console.log('Parsed AI feedback:', aiFeedback);

    return new Response(JSON.stringify(aiFeedback), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-task function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});