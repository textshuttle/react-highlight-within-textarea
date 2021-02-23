import React, { useState, useRef, useEffect } from 'react';
import styles from './styles/styles.css';
import HighlighedContents from './HighlighedContents';

export const HighlightWithinTextarea = React.forwardRef(({value, onChange, highlight={}, className = "",  style={}, containerStyle={}, containerClassName="", onScroll, ...textareaProps}, ref) => {
  const textareaRef = ref || useRef(null);
  const backdropRef = useRef(null);

  className = `${styles.input} ${styles.content} ${className}`;
  containerClassName = `${styles.container} ${containerClassName}`;

  // Resizing is currently not supported
  style.resize = "none";

  // To properly work, value and onChange must be supplied.  Give a hint for new users.
  const [fakeValue, setFakeValue] = useState("Please supply a value and an onChange parameter.");
  if (value == undefined) {
    value = fakeValue;
    onChange = event => {setFakeValue(event.target.value)};
  }

  useEffect(() => {
    const copyNodeStyle = (sourceNode, targetNode) => {
      const computedStyle = window.getComputedStyle(sourceNode, null);
      console.log(computedStyle)
      const relevantStyles = [
        "padding-left",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "text-align",
        "text",
        "height",
        "letter-spacing",
        "line-height",
        "font-size",
        "font-weight"
      ]
      Array.from(computedStyle).forEach(function (key) {
        if (relevantStyles.includes(key)){
          return targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key));
        }
      });
    }

    copyNodeStyle(textareaRef.current, backdropRef.current)
  });


  const handleScroll = event => {
    backdropRef.current.scrollTop = textareaRef.current.scrollTop;
    backdropRef.current.scrollLeft = textareaRef.current.scrollLeft;
    console.log('handleScroll')
  };
  const blockContainerScroll = event => { console.log('blockContainerScroll')};

  return (
    <div className={containerClassName} style={containerStyle} onScroll={blockContainerScroll} >
      <div className={styles.backdrop} ref={backdropRef}>
        <HighlighedContents value={value} highlight={highlight}>
        </HighlighedContents>
      </div>
      <textarea value={value} onChange={onChange} style={style} className={className} {...textareaProps} onScroll={handleScroll} ref={textareaRef} >
      </textarea>
    </div>
  );
}
);
