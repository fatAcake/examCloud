import { useEffect, useMemo, useState } from 'react';
import './App.css';
import ElementGrid from './components/ElementGrid';
import SeriesSection from './components/SeriesSection';
import Legend from './components/Legend';
import { characteristicClass } from './utils/categoryClass';

function App() {
  const [elements, setElements] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadElements = async () => {
      try {
        const response = await fetch('/periodic_table.json');
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные');
        }
        const data = await response.json();
        setElements(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadElements();
  }, []);

  const mainElements = useMemo(
    () =>
      elements.filter(
        (el) =>
          !el.characteristic?.toLowerCase().includes('лантаноид') &&
          !el.characteristic?.toLowerCase().includes('актиноид')
      ),
    [elements]
  );

  const lanthanides = useMemo(
    () =>
      elements.filter((el) => el.characteristic?.toLowerCase().includes('лантаноид')),
    [elements]
  );

  const actinides = useMemo(
    () =>
      elements.filter((el) => el.characteristic?.toLowerCase().includes('актиноид')),
    [elements]
  );

  const legend = useMemo(
    () => [
      { label: 'Щелочные металлы', className: 'cat-alkali' },
      { label: 'Щелочноземельные металлы', className: 'cat-alkaline-earth' },
      { label: 'Переходные металлы', className: 'cat-transition' },
      { label: 'Металлы', className: 'cat-metal' },
      { label: 'Галогены (вкл. неметаллы/металлоиды)', className: 'cat-halogen' },
      { label: 'Инертные газы', className: 'cat-inert' },
      { label: 'Лантаноиды', className: 'cat-lanthanide' },
      { label: 'Актиноиды', className: 'cat-actinide' },
    ],
    []
  );

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Периодическая система</p>
          <h1 className="title">Таблица Менделеева</h1>металлоидыметаллоиды
        </div>
        <Legend legend={legend} />
      </header>

      <section className="table-section">
        <div className="table-card">
          {error && <div className="error">{error}</div>}
          <ElementGrid
            elements={mainElements}
            characteristicClass={characteristicClass}
            minWidth={110}
          />

          <SeriesSection
            title="Лантаноиды"
            elements={lanthanides}
            characteristicClass={characteristicClass}
            minWidth={110}
          />

          <SeriesSection
            title="Актиноиды"
            elements={actinides}
            characteristicClass={characteristicClass}
            minWidth={110}
          />
        </div>
      </section>

      <section className="bottom-space" aria-label="Свободное пространство">
        <div className="placeholder"></div>
      </section>
    </div>
  );
}

export default App;
