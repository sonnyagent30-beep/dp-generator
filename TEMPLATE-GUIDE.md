# Template Design Guide — Dannion DP Generator

Templates are **800×800 PNG** files placed in `/public/designs/`.
After designing, add a config entry in `src/lib/designs.ts`.

---

## Template Layout (800×800 canvas)

```
┌─────────────────────────────┐
│                             │
│      DECORATIVE FRAME        │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │   CIRCULAR CUTOUT   │ ← User photo goes here
│   │   (transparent)     │   │   Center of circle = (x + w/2, y + h/2)
│   │                     │   │   Radius = min(w, h) / 2
│   └─────────────────────┘   │
│                             │
│   [  NAME TEXT HERE  ]  ← x, y coordinates from config
└─────────────────────────────┘
```

---

## Required Elements

### 1. Circular Photo Zone (TRANSPARENT)
- Cut out a **perfect circle** in the center of your design
- This area must be **fully transparent** (checkerboard in Photoshop/Canva)
- The user's photo will be composited here

### 2. Decorative Frame
- Design around and behind the circle
- Think: borders, patterns, flowers, gradients, themed ornaments
- The circle "reveals" your background through the user's photo

### 3. Name Text Space
- Reserve space below the circle for the name
- Name is rendered **on top** of your design (overwrites whatever is there)
- Add a subtle background box or glow behind where the name will go

---

## Config Fields (in `src/lib/designs.ts`)

| Field | Example | Description |
|---|---|---|
| `photoPosition.x` | `220` | Left edge of circle bounding box |
| `photoPosition.y` | `220` | Top edge of circle bounding box |
| `photoPosition.width` | `360` | Width of circle bounding box |
| `photoPosition.height` | `360` | Height of circle bounding box |
| `namePosition.x` | `400` | X center of name text |
| `namePosition.y` | `710` | Y center of name text |
| `namePosition.fontSize` | `24` | Font size in pixels |
| `namePosition.color` | `#B45478` | Hex color for the name |

---

## Step-by-Step Design Process

### Option A — Canva (Free, Easiest)

1. Create design **800×800 px**
2. Design your frame (borders, flowers, gradients, ornaments)
3. Use **transparent** background
4. Draw a **white filled circle** to mark where the photo goes
5. **Delete** the white circle (make it transparent)
6. Add a **subtle text area hint** at the bottom (optional)
7. Download as **PNG** → save to `/public/designs/your-template.png`
8. Add entry to `src/lib/designs.ts`

### Option B — Photoshop / GIMP

1. Canvas **800×800 px**, transparent background
2. Design decorative frame
3. Use **Ellipse Tool** to draw a circle
4. **Right-click layer** → **Layer via Cut** to isolate the circle
5. **Delete** the circle area (make transparent)
6. Export as **PNG** with transparency
7. Save to `/public/designs/` and add to config

---

## Design Tips

- **Center the circle** at approximately (400, 400) for a balanced layout
- **Recommended circle size:** 320–400 px diameter
- **Name position:** leave roughly 100–120 px below the circle for the name
- **Dark backgrounds** work best — they contrast well with photos
- **Avoid placing important design elements** where the name will render (bottom center)
- Add a **text backdrop box** behind the name area to ensure readability
- Use **bold, readable fonts** for any text baked into the template itself

---

## Adding Your Template

1. Save PNG to: `/public/designs/your-template.png`
2. Open `src/lib/designs.ts`
3. Add a new entry:

```ts
{
  id: 'your-template',
  name: 'Your Template Name',
  description: 'Short description of the theme',
  image: '/designs/your-template.png',
  photoPosition: { x: 200, y: 200, width: 400, height: 400 },
  namePosition: { x: 400, y: 720, fontSize: 24, color: '#FFFFFF' },
},
```

4. **Circle math:** `centerX = x + width/2`, `centerY = y + height/2`, `radius = min(width,height)/2`
5. Save, commit, and push — Vercel auto-deploys

---

## Testing

After adding a new template, test with:
- Portrait photo (person's face should be centered)
- Landscape photo (should fill circle without cropping the face)
- Short name and long name (check text doesn't overflow)
- Different circle positions (move circle higher/lower to find the best spot)