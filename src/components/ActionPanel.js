import React from 'react';

function ActionPanel({ onAddOperator, onCalculate, onClear }) {
  const handleAddClick = () => {
    // Добавляем "+" как элемент-оператор
    onAddOperator({
      elementChar: '+',
      elementNumb: '',
      elementName: 'Соединение',
      characteristic: 'оператор',
      isOperator: true,
    });
  };

  return (
    <div className="action-panel">
      <button
        className="action-button add-button"
        onClick={handleAddClick}
        title="Добавить оператор соединения"
        aria-label="Добавить оператор соединения"
      >
        +
      </button>
      <button
        className="action-button equals-button"
        onClick={onCalculate}
        title="Вычислить"
        aria-label="Вычислить"
      >
        =
      </button>
      <button
        className="action-button clear-button"
        onClick={onClear}
        title="Очистить"
        aria-label="Очистить"
      >
        ⌫
      </button>
    </div>
  );
}

export default ActionPanel;

