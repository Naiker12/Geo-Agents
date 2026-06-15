import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import { CodeBlock } from "./docs/CodeBlock";

type MarkdownProps = {
  content: string;
  components?: Components;
};

export function Markdown({ content, components }: MarkdownProps) {
  const defaultComponents: Components = {
    pre: ({ children }) => {
      // Extract the inner text from <code>
      let text = "";
      if (typeof children === "string") {
        text = children;
      } else if (Array.isArray(children)) {
        children.forEach((child) => {
          if (typeof child === "string") {
            text += child;
          } else if (child && "props" in child && "children" in child.props) {
            if (typeof child.props.children === "string") {
              text += child.props.children;
            }
          }
        });
      } else if (children && "props" in children && "children" in children.props) {
        if (typeof children.props.children === "string") {
          text = children.props.children;
        }
      }
      return <CodeBlock>{text}</CodeBlock>;
    },
  };

  return (
    <div className="prose-docs">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{ ...defaultComponents, ...components }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
