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
    console.log('Received request with:', { reason, customReason, taskDetails });

    // Initialize Cohere
    const cohereApiKey = Deno.env.get('COHERE_API_KEY');
    if (!cohereApiKey) {
      console.error('Cohere API key not found');
      throw new Error('Cohere API key not configured');
    }
    
    let prompt = `As a productivity assistant, analyze this procrastination situation and provide helpful advice. 
    Task: ${taskDetails.task_name}
    Reason: ${reason}${customReason ? ` (${customReason})` : ''}
    
    Provide:
    1. A brief analysis of why this might be happening (2-3 sentences)
    2. Three specific, actionable steps to overcome this
    3. A short motivational message (1 sentence)
    
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
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7,
        format: 'json',
        stop_sequences: ["}"]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Cohere API error:', error);
      throw new Error(`Cohere API error: ${error}`);
    }

    const data = await response.json();
    console.log('Cohere response:', data);

    // Parse the generated text as JSON
    const generatedText = data.generations[0].text;
    // Make sure the text ends with a closing brace if it doesn't already
    const jsonText = generatedText.endsWith('}') ? generatedText : generatedText + '}';
    const aiFeedback = JSON.parse(jsonText);

    console.log('Parsed AI feedback:', aiFeedback);

    return new Response(JSON.stringify(aiFeedback), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-text function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check the function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});