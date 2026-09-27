import { jsonLdGraph } from "@/lib/seo";

type Props = {
  nodes: Record<string, unknown>[];
};

export default function JsonLd({ nodes }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph(nodes)) }}
    />
  );
}
