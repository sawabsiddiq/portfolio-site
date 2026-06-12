import Link from "next/link";
import { FlowDiagram } from "@/components/pipeline/FlowDiagram";

/** The pipeline with a broken route (§3.2). */
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col justify-center pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <p className="mono-label text-fg3">404</p>
        <h1 className="display-lg mt-4 text-fg">
          ROUTE NOT FOUND <span className="text-fg3">→</span> ESCALATING
        </h1>
        <div className="mt-12 max-w-xl opacity-70">
          <FlowDiagram
            spec={{ stages: ["REQUEST", "ROUTER", "???"], branches: ["HUMAN ESCALATION", "VOID"] }}
          />
        </div>
        <Link
          href="/"
          className="mono-label link-underline mt-12 inline-block text-fg2 hover:text-fg"
        >
          ← RETURN HOME
        </Link>
      </div>
    </section>
  );
}
