/**
 * Custom image loader for Cloudflare Pages
 * Optimizes images using Cloudflare's CDN
 */

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If it's an external URL, return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // For local assets, you can use Cloudflare Image Resizing
  // https://developers.cloudflare.com/images/image-resizing/
  const params = new URLSearchParams();
  params.set('width', width.toString());
  if (quality) {
    params.set('quality', quality.toString());
  }
  params.set('format', 'auto'); // Auto-detect best format (WebP, AVIF, etc.)

  // Construct the Cloudflare Images URL
  // Format: /cdn-cgi/image/width=<width>,quality=<quality>,format=auto/<src>
  return `/cdn-cgi/image/${params.toString()}${src}`;
}
