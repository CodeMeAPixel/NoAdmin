import { Callout, CodeBlock } from "@/components/ui/primitives";
import type { Block } from "@/lib/guides";

const HIERARCHY_TONE = {
  top: "border-white/[0.06] text-zinc-400",
  bot: "border-sky-400/40 bg-sky-400/[0.06] text-sky-300",
  below: "border-white/[0.06] text-zinc-200",
};

export function GuideBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed text-zinc-300">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        switch (block.type) {
          case "p":
            return <p key={key}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={key}
                className="pt-4 text-xl font-semibold tracking-tight text-white"
              >
                {block.text}
              </h2>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={key}
                className={`space-y-2 pl-5 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-zinc-500`}
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Tag>
            );
          }
          case "code":
            return (
              <CodeBlock key={key} code={block.code} label={block.language} />
            );
          case "callout":
            return (
              <Callout key={key} tone={block.tone} title={block.title}>
                {block.text}
              </Callout>
            );
          case "hierarchy":
            return (
              <ol
                key={key}
                className="space-y-1.5"
                aria-label="Role order, highest first"
              >
                {block.rows.map((row) => (
                  <li
                    key={row.name}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${HIERARCHY_TONE[row.tone]}`}
                  >
                    <span className="font-medium">{row.name}</span>
                    <span className="text-xs opacity-80">{row.note}</span>
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
