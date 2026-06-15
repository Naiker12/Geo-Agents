import GithubSlugger from "github-slugger";

export interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

export interface NavGroup {
  label: string;
  items: { text: string; slug: string; icon?: string }[];
}

const slugger = new GithubSlugger();

export function extractToc(markdown: string): TocItem[] {
  slugger.reset();
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,4})\s+(.*)$/.exec(line);
    if (match) {
      const depth = match[1].length;
      // strip markdown emphasis & inline code markers and trailing symbols
      const text = match[2]
        .replace(/[*_`]/g, "")
        .replace(/★.*$/, "")
        .trim();
      toc.push({ depth, text, slug: slugger.slug(text) });
    }
  }
  return toc;
}
