import { socialImage, socialImageSize } from "../lib/social-image";

export const alt = "Rick Lamanna, freiberuflicher Applied AI Engineer und Fractional Head of AI für Unternehmen in Deutschland";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return socialImage("Fractional Head of AI. KI-Umsetzung direkt in Ihrem Team.", "KI für den deutschen Mittelstand");
}
