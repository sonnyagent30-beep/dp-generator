# Templates Guide

This directory contains design templates for the DP Generator.

## Adding New Templates

1. Add template image to `/public/designs/`
2. Update `src/lib/designs.ts` with template configuration
3. Configure photo and name positions

## Template Configuration

Each template needs:
- `photoPosition`: { x, y, width, height }
- `namePosition`: { x, y, fontSize, color }
