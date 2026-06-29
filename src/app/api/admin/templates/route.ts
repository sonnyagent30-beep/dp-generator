import { NextRequest, NextResponse } from 'next/server';
import { designs, getDesignById } from '@/lib/designs';

// In-memory storage for demo (use a database in production)
const templates = new Map<string, unknown>();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (id) {
    const template = getDesignById(id);
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    return NextResponse.json(template);
  }

  // Return all templates
  return NextResponse.json(designs);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, photoPosition, namePosition } = body;

    if (!name || !photoPosition || !namePosition) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const id = name.toLowerCase().replace(/\s+/g, '-');
    const template = {
      id,
      name,
      description: description || '',
      image: `/designs/${id}.png`,
      photoPosition,
      namePosition,
    };

    templates.set(id, template);
    return NextResponse.json(template, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
