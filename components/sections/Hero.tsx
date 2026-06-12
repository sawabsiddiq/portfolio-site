import { Button } from "@/components/ui/Button";
import { PipelineSVG } from "@/components/pipeline/PipelineSVG";
import { MobilePipeline } from "@/components/pipeline/MobilePipeline";
import { HeroCanvas } from "@/components/pipeline/HeroCanvas";
import { hero, site } from "@/data/site";

const seq = (ms: number) => ({ "--seq": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40">
      <div aria-hidden className="hero-glow absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <p className="mono-label hero-seq text-fg3" style={seq(0)}>
          {hero.eyebrow}
        </p>
        <h1 className="display-xl mt-6 max-w-[18ch] text-fg">
          {hero.headline.map((line, i) => (
            <span key={line} className="hero-seq block" style={seq(100 + i * 80)}>
              {line}
            </span>
          ))}
        </h1>
        <p
          className="hero-seq mt-6 max-w-[62ch] text-lg leading-[1.65] text-fg2"
          style={seq(350)}
        >
          {hero.subline}
        </p>
        <div className="hero-seq mt-8 flex flex-wrap gap-3" style={seq(350)}>
          <Button href="/#work" variant="primary" arrow>
            VIEW CASE STUDIES
          </Button>
          <Button href={site.resume} download>
            RESUME
          </Button>
          <Button href="/#contact">CONTACT</Button>
        </div>

        <div className="mt-16 hidden md:block">
          <HeroCanvas>
            <PipelineSVG />
          </HeroCanvas>
        </div>
        {/* below md the scaled SVG labels turn illegible: vertical variant (§7) */}
        <div className="mt-12 md:hidden">
          <HeroCanvas>
            <MobilePipeline />
          </HeroCanvas>
        </div>

        <p
          className="mono-body hero-seq mt-12 flex flex-wrap gap-x-3 gap-y-1 text-fg3"
          style={seq(1300)}
        >
          {hero.proofRow.map((item, i) => (
            <span key={item}>
              {item}
              {i < hero.proofRow.length - 1 && <span aria-hidden className="ml-3">·</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
