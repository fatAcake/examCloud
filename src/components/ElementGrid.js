import React from 'react';

function ElementGrid({ elements, characteristicClass, minWidth = 110 }) {
  return (
    <div
      className="grid"
      role="list"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))` }}
    >
      {elements.map((cell) => (
        <a
          key={`${cell.elementNumb}-${cell.elementChar}`}
          className={`cell ${characteristicClass(cell.characteristic)}`}
          href={cell.url}
          target="_blank"
          rel="noreferrer"
          role="listitem"
          title={cell.characteristic}
        >
          <span className="number">{cell.elementNumb}</span>
          <span className="symbol">{cell.elementChar}</span>
          <span className="name">{cell.elementName}</span>
        </a>
      ))}
    </div>
  );
}

export default ElementGrid;

