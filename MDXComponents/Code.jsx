import React, {useRef, useState} from 'react';
import Highlight, {Language, Prism} from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {IconButton} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const white = grey[50];

const CopyButton = (ref) => {
  async function copyToClip() {
    if (ref.current) {
      const code = ref.current.innerText;
      await navigator.clipboard.writeText(code);
    }
    console.log('code copied!');
    setCopied(true);
  }
  const [copied, setCopied] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setCopied(false)}>
      <IconButton
        onClick={copyToClip}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          fontSize: '0.25 rem',
          opacity: copied ? 1 : 0.5,
          color: 'white',
        }}>
        <FileCopyIcon style={{color: white}} fontSize="small" />
      </IconButton>
    </ClickAwayListener>
  );
};

const Code = ({
  children,
  className,
}) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const language = className
    ? className.replace(/language-/, '')
    : 'markdown';
  // console.log(rest);
  return (
    <div style={{position: 'relative'}}>
      <Highlight
        theme={vsDark}
        Prism={Prism}
        code={children}
        language={language}>
        {({
          className: codeClassName,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <pre
            ref={codeRef}
            className={codeClassName}
            style={{...style, padding: '20px', overflowX: 'auto'}}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                {line.map((token, key) => {
                  if (!token.empty) {
                    return <span key={key} {...getTokenProps({token, key})} />;
                  }
                })}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <CopyButton {...codeRef} />
    </div>
  );
};

export default Code;
