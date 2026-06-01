import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.REMOVEBG_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get('image_file') as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Forward to remove.bg API
    const removeBgFormData = new FormData();
    removeBgFormData.append('image_file', imageFile);
    removeBgFormData.append('size', 'auto');
    removeBgFormData.append('format', 'png');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: removeBgFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, error: `Remove.bg API error: ${response.status}` },
        { status: response.status }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ success: true, data: dataUrl });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}