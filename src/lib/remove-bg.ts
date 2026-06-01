const REMOVEBG_API_KEY = process.env.REMOVEBG_API_KEY;

export interface RemoveBackgroundResult {
  success: boolean;
  data?: string; // base64 encoded image
  error?: string;
}

export async function removeBackground(imageFile: File): Promise<RemoveBackgroundResult> {
  if (!REMOVEBG_API_KEY) {
    return { success: false, error: 'Remove.bg API key not configured. Add REMOVEBG_API_KEY to your .env.local file.' };
  }

  try {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');
    formData.append('format', 'png');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVEBG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `API error: ${response.status} - ${errorText}` };
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    return { success: true, data: `data:image/png;base64,${base64}` };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}