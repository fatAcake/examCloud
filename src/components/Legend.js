import React from 'react';

function Legend({ legend }) {
  return (
    <div className="legend" aria-label="Легенда категорий">
      {legend.map((item) => (
        <div className="legend-item" key={item.className}>
          <span className={`legend-dot ${item.className}`} />
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;

