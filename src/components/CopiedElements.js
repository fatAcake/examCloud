import React from 'react';
import { characteristicClass } from '../utils/categoryClass';

function CopiedElements({ elements, onRemove }) {
  if (!elements || elements.length === 0) {
    return (
      <div className="placeholder">
        Перетащите элементы сюда, чтобы скопировать их
      </div>
    );
  }

  return (
    <div className="copied-elements-container">
      <div className="copied-elements-grid">
        {elements.map((element, index) => {
          const isOperator = element.isOperator;
          return (
            <div
              key={`copied-${element.elementNumb || element.elementChar}-${index}`}
              className={`cell copied-cell ${
                isOperator
                  ? 'cell-operator'
                  : characteristicClass(element.characteristic)
              }`}
              title={element.characteristic || 'Оператор'}
            >
              <button
                className="remove-button"
                onClick={() => onRemove(index)}
                aria-label="Удалить элемент"
              >
                ×
              </button>
              {!isOperator && <span className="number">{element.elementNumb}</span>}
              <span className="symbol">{element.elementChar}</span>
              {!isOperator && <span className="name">{element.elementName}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CopiedElements;

