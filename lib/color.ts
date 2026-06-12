/**
 * Mute a brand hex for the dark ink palette: desaturate ~35% and pull
 * lightness into a narrow band so every vendor color sits at the same
 * visual volume (design rule: brand color at icon scale only).
 */
export function muteBrand(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const mutedS = Math.round(s * 65);
  const mutedL = Math.round(Math.min(Math.max(l * 100, 52), 68));
  return `hsl(${Math.round(h * 360)} ${mutedS}% ${mutedL}%)`;
}
