import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DESIGNS_DIR = path.join(process.cwd(), "public", "designs");
const CONFIGS_FILE = path.join(DESIGNS_DIR, "configs.json");

interface TemplateConfig {
  id: string;
  name: string;
  image: string;
  config: Record<string, unknown>;
  createdAt: string;
}

async function ensureConfigsDir() {
  try {
    await fs.access(DESIGNS_DIR);
  } catch {
    await fs.mkdir(DESIGNS_DIR, { recursive: true });
  }
}

async function readConfigs(): Promise<TemplateConfig[]> {
  try {
    const data = await fs.readFile(CONFIGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeConfigs(configs: TemplateConfig[]): Promise<void> {
  await fs.writeFile(CONFIGS_FILE, JSON.stringify(configs, null, 2), "utf-8");
}

export async function GET() {
  try {
    await ensureConfigsDir();
    const configs = await readConfigs();
    return NextResponse.json(configs);
  } catch (error) {
    console.error("Error reading configs:", error);
    return NextResponse.json({ error: "Failed to read templates" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureConfigsDir();

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const name = formData.get("name") as string | null;
    const configStr = formData.get("config") as string | null;

    if (!file || !name) {
      return NextResponse.json(
        { error: "Missing required fields: image and name" },
        { status: 400 }
      );
    }

    // Generate unique ID and filename
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const ext = file.name.split(".").pop() || "png";
    const filename = `${id}.${ext}`;
    const imagePath = path.join(DESIGNS_DIR, filename);

    // Save image
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(imagePath, buffer);

    // Parse config
    let templateConfig: Record<string, unknown> = {};
    if (configStr) {
      try {
        templateConfig = JSON.parse(configStr);
      } catch {
        return NextResponse.json({ error: "Invalid config JSON" }, { status: 400 });
      }
    }

    // Read existing configs, add new one, write back
    const configs = await readConfigs();
    const newTemplate: TemplateConfig = {
      id,
      name,
      image: `/designs/${filename}`,
      config: templateConfig,
      createdAt: new Date().toISOString(),
    };
    configs.push(newTemplate);
    await writeConfigs(configs);

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing template ID" }, { status: 400 });
    }

    const configs = await readConfigs();
    const templateIndex = configs.findIndex((t) => t.id === id);

    if (templateIndex === -1) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    const template = configs[templateIndex];

    // Delete image file
    const imagePath = path.join(process.cwd(), "public", template.image);
    try {
      await fs.unlink(imagePath);
    } catch {
      // Image file may not exist, continue anyway
    }

    // Remove from configs and write back
    configs.splice(templateIndex, 1);
    await writeConfigs(configs);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}
