
/* Auto-generated, do not edit */
import React from 'react';

interface Props {
    size?: number | string;
    width?: number | string;
    height?: number | string;
    fill?: string;
}

function Calendar_day(props: Props) {
    const { size = 14, width = size, height = size, fill = '' } = props;
    return (
      <svg viewBox="0 0 448 512" width={ `${ width }px` } height={ `${ height }px` } ><path d="M400 64h-48V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v56H128V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v56H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V192h384v272zm0-304H32v-48c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v48zM112 384h96c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-96c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16zm16-96h64v64h-64v-64z"/></svg>
  );
}

export default Calendar_day;
