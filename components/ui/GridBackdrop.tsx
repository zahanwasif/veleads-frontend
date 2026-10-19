// Ambient backdrop for light hero panels: a faint grid fading out from the headline, over iris and mint glows.
// The parent needs `relative isolate overflow-hidden`.
export function GridBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Mesh gradient: iris wash from the top, mint and iris pools on the sides. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(91,91,246,0.28),transparent_70%),radial-gradient(35%_45%_at_0%_70%,rgba(94,234,212,0.35),transparent_70%),radial-gradient(35%_45%_at_100%_55%,rgba(91,91,246,0.25),transparent_70%)]" />
      {/* Grid lines, fading out towards the edges. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(91,91,246,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,91,246,0.16)_1px,transparent_1px)] bg-[size:48px_48px] bg-[position:center_top] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_30%,#000_20%,transparent_100%)]" />
      {/* Brighter dots where the grid lines cross, near the headline. */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(91,91,246,0.45)_1.5px,transparent_1.5px)] bg-[size:48px_48px] bg-[position:calc(50%+24px)_-24px] [mask-image:radial-gradient(ellipse_45%_40%_at_50%_30%,#000_10%,transparent_100%)]" />
    </div>
  );
}
