import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';

interface WorkCardProps {
  caseStudy: CaseStudyItem;
}

// Screenshots are 1440x900 viewport captures (16:10). We hand next/image
// the intrinsic ratio and let it render at natural height inside the
// masonry column, so nothing is ever cropped.
const SHOT_W = 1440;
const SHOT_H = 900;

export function WorkCard({ caseStudy }: WorkCardProps) {
  return caseStudy.img ? (
    <ImageCard caseStudy={caseStudy} />
  ) : (
    <TextCard caseStudy={caseStudy} />
  );
}

// Cards that have a real screenshot: the image leads, a compact caption
// follows. The screenshot is shown whole — the crop the old fixed-height
// grid forced is gone.
function ImageCard({ caseStudy }: WorkCardProps) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-brand-surface transition-colors duration-300 hover:border-brand-yellow/40"
    >
      <div className="overflow-hidden">
        <Image
          src={caseStudy.img!}
          alt={`${caseStudy.name} — ${caseStudy.category} project by Pixdyne`}
          width={SHOT_W}
          height={SHOT_H}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-serif text-2xl italic leading-tight text-brand-text transition-colors duration-300 group-hover:text-brand-yellow">
            {caseStudy.name}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-muted">
            {caseStudy.category}
          </p>
          {caseStudy.shortDescription && (
            <p className="mt-3 text-sm leading-relaxed text-brand-muted line-clamp-2">
              {caseStudy.shortDescription}
            </p>
          )}
        </div>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="mt-1 shrink-0 text-brand-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-yellow"
        />
      </div>
    </Link>
  );
}

// Cards with no screenshot yet (the larger systems still being written up).
// Rather than a flat placeholder tile, the project's initial is set as an
// oversized serif watermark so typography carries the card. Reads as a
// deliberate plate, not a missing image.
function TextCard({ caseStudy }: WorkCardProps) {
  const monogram = caseStudy.name.charAt(0);

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-white/10 bg-brand-surface p-6 transition-colors duration-300 hover:border-brand-yellow/40"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-2 select-none font-serif text-[11rem] italic leading-none text-brand-yellow/[0.07] transition-colors duration-500 group-hover:text-brand-yellow/[0.13]"
      >
        {monogram}
      </span>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 0%, rgba(200, 150, 42, 0.10), transparent 55%)'
        }}
      />

      <div className="relative flex min-h-[248px] flex-col justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-yellow/80">
          {caseStudy.category}
        </p>
        <div>
          <h3 className="font-serif text-3xl italic leading-tight text-brand-text transition-colors duration-300 group-hover:text-brand-yellow">
            {caseStudy.name}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-brand-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
