export interface RemoveBackgroundResult {
  success: boolean;
  data?: string; // base64 encoded image
  error?: string;
}

export async function removeBackground(imageFile: File): Promise<RemoveBackgroundResult> {
  try {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');
    formData.append('format', 'png');

    const response = await fetch('/api/remove-bg', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || `API error: ${response.status}` };
    }

    const result = await response.json();
    if (result.success && result.data) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.error || 'Unknown error' };
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}