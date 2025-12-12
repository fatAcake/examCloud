import React from 'react';
import ElementGrid from './ElementGrid';

function SeriesSection({ title, elements, characteristicClass, minWidth = 110 }) {
  if (!elements.length) return null;

  return (
    <div className="series-block">
      <div className="series-title">{title}</div>
      <div className="series-grid">
        <ElementGrid
          elements={elements}
          characteristicClass={characteristicClass}
          minWidth={minWidth}
        />
      </div>
    </div>
  );
}

export default SeriesSection;

