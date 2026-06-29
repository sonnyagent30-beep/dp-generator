export interface RemoveBgResult {
  success: boolean;
  resultUrl?: string;
  error?: string;
}

export async function removeBackground(imageSrc: string): Promise<RemoveBgResult> {
  try {
    const response = await fetch('/api/remove-bg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: imageSrc }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove background',
    };
  }
}
