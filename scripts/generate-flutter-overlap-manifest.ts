import fs from 'fs';
import path from 'path';
import {
  detectOpacityOverlaps,
  detectInternalStrokeOverlapGroupIds,
} from '../gulp/detect-opacity-overlap';

const SVG_DIR = path.resolve(__dirname, '../svg');
const OUT = path.resolve(__dirname, '../packages/flutter/tool/overlap_manifest.json');

const files = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'));
const manifest: Record<string, unknown> = {};

for (const f of files) {
  const iconName = f.replace(/\.svg$/, '');
  const overlaps = detectOpacityOverlaps(iconName);
  const internal = detectInternalStrokeOverlapGroupIds(iconName);
  if (overlaps.length || internal.length) {
    manifest[iconName] = {
      overlaps: overlaps.map((o) => ({
        lower: o.lowerPathId,
        upper: o.upperPathIds,
        paint: o.paintType,
      })),
      internal,
    };
  }
}

const sorted: Record<string, unknown> = {};
Object.keys(manifest)
  .sort()
  .forEach((k) => {
    sorted[k] = manifest[k];
  });

fs.writeFileSync(OUT, `${JSON.stringify(sorted)}\n`);
console.log(`wrote ${Object.keys(sorted).length} icons -> ${path.relative(process.cwd(), OUT)}`);
