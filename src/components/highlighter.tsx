import { Fragment } from "react";

export function Highlighter(props: {
  tokens: {
    word: string
    shouldHighlight: boolean,
  }[]  
}) {
  return (
    <>
      {props.tokens.map((token, index) =>
        token.shouldHighlight ? (
          <span className="highlight" key={index}>{token.word}</span>
        ) : (
          <Fragment key={index}>
            {' '}{token.word}{' '}
          </Fragment>
        )
      )}
    </>
  );
}
