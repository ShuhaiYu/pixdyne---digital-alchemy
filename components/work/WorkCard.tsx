import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';

interface WorkCardProps {
  caseStudy: CaseStudyItem;
}

// Screenshots are 1440x900 (16:10). We give next/image the intrinsic
// dimensions but render inside a fixed aspect-ratio frame, so cards
// land the same image height across a row regardless of container
// width. object-cover keeps the screenshot whole within the frame.
const SHOT_W = 1440;
const SHOT_H = 900;

export function WorkCard({ caseStudy }: WorkCardProps) {
  return caseStudy.img ? (
    <ImageCard caseStudy={caseStudy} />
  ) : (
    <TextCard caseStudy={caseStudy} />
  );
}

// Card variant for projects that have a real captured screenshot.
// h-full + flex-col so when the parent grid stretches the row, the
// text block below the image fills the leftover space cleanly.
function ImageCard({ caseStudy }: WorkCardProps) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-brand-surface transition-colors duration-300 hover:border-brand-yellow/40"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          src={caseStudy.img!}
          alt={`${caseStudy.name} — ${caseStudy.category} project by Pixdyne`}
          width={SHOT_W}
          height={SHOT_H}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <h3 className="font-serif text-2xl italic leading-tight text-brand-text transition-colors duration-300 group-hover:text-brand-yellow line-clamp-1">
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

// Card variant for projects without a screenshot yet. An oversized
// serif monogram does the visual work in place of an image. h-full +
// flex-col makes it work inside both uniform grids and bento layouts.
function TextCard({ caseStudy }: WorkCardProps) {
  const monogram = caseStudy.name.charAt(0);

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl border border-white/10 bg-brand-surface p-6 transition-colors duration-300 hover:border-brand-yellow/40"
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

      <div className="relative flex flex-1 flex-col justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-yellow/80">
          {caseStudy.category}
        </p>
        <div>
          <h3 className="font-serif text-3xl italic leading-tight text-brand-text transition-colors duration-300 group-hover:text-brand-yellow line-clamp-2">
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
