import ReactMarkdown from "react-markdown";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import PostHeader from "./post-header";

import styles from "./post-content.module.css";
import Image from "next/legacy/image";

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderer = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       width={600}
    //       height={300}
    //       alt={image.alt}
    //     />
    //   );
    // },
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              width={600}
              height={300}
              alt={image.alt}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1];
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderer}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
