const showcasePhotos = [
  { webp: '/services/showcase/web-product.webp', png: '/services/showcase/web-product.png' },
  { webp: '/services/showcase/ai-orchestration.webp', png: '/services/showcase/ai-orchestration.png' },
  { webp: '/services/showcase/ai-workflow.webp', png: '/services/showcase/ai-workflow.png' },
  { webp: '/services/showcase/shopify-store.webp', png: '/services/showcase/shopify-store.png' },
  { webp: '/services/showcase/marketing-analytics.webp', png: '/services/showcase/marketing-analytics.png' },
  { webp: '/services/showcase/graphic-design.webp', png: '/services/showcase/graphic-design.png' },
];

/** Tactile stationery frame for the existing service-specific technical plate. */
export default function ServicePinboard({ variant }: { variant: number }) {
  const photo = showcasePhotos[variant] || showcasePhotos[0];
  return (
    <div className={`service-pinboard service-pinboard--${variant + 1}`} aria-hidden="true">
      <div className="service-pinboard__sheet service-pinboard__sheet--back" />
      <div className="service-pinboard__sheet service-pinboard__sheet--grid" />
      <div className="service-pinboard__note service-pinboard__note--top">SYSTEM / STUDY</div>
      <div className="service-pinboard__tape service-pinboard__tape--top" />
      <div className="service-pinboard__clip" />
      <div className="service-pinboard__paper">
        <span className="service-pinboard__paper-label">FIELD NOTES / IIT-{String(variant + 1).padStart(2, '0')}</span>
        <div className="service-pinboard__photo">
          <picture>
            <source srcSet={photo.webp} type="image/webp" />
            <img
              src={photo.png}
              alt=""
              loading={variant === 0 ? 'eager' : 'lazy'}
              decoding="async"
              width={1200}
              height={800}
            />
          </picture>
          <span className="service-pinboard__photo-vignette" />
        </div>
        <span className="service-pinboard__pencil-line" />
      </div>
      <div className="service-pinboard__note service-pinboard__note--bottom">ITERATE / CONNECT / SHIP</div>
    </div>
  );
}
