import React from 'react';

function ReactionDisplay({ gifPath, onClose }) {
  if (!gifPath) {
    return (
      <div className="reaction-area">
        <div className="reaction-placeholder">
          Результаты реакций будут отображаться здесь
        </div>
      </div>
    );
  }

  return (
    <div className="reaction-area">
      <div className="reaction-content-inline">
        <button className="reaction-close-inline" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <img src={gifPath} alt="Химическая реакция" className="reaction-gif-inline" />
      </div>
    </div>
  );
}

export default ReactionDisplay;

