import React from "react";
import ReactMarkdown from "react-markdown";

export const MarkdownViewer = ({ source }) => {
  return (
    <ReactMarkdown
      source={source}
      escapeHtml={false}
      renderers={{
        table: (props) => {
          return (
            <table className="table table-bordered table-striped">
              {props.children}
            </table>
          );
        },
      }}
    />
  );
};
