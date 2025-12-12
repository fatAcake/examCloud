import { useEffect, useMemo, useState } from 'react';
import './App.css';
import ElementGrid from './components/ElementGrid';
import SeriesSection from './components/SeriesSection';
import Legend from './components/Legend';
import CopiedElements from './components/CopiedElements';
import ActionPanel from './components/ActionPanel';
import ReactionDisplay from './components/ReactionDisplay';
import { characteristicClass } from './utils/categoryClass';

function App() {
  const [elements, setElements] = useState([]);
  const [error, setError] = useState('');
  const [copiedElements, setCopiedElements] = useState([]);
  const [reactionGif, setReactionGif] = useState(null);

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

  const checkReaction = (elements) => {
   
    const onlyElements = elements.filter((el) => !el.isOperator);
    

    const elementCounts = {};
    onlyElements.forEach((el) => {
      const symbol = el.elementChar;
      if (symbol) {
        
        const normalized = symbol.length > 1 
          ? symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase()
          : symbol.toUpperCase();
        elementCounts[normalized] = (elementCounts[normalized] || 0) + 1;
      }
    });

    // Проверяем реакцию: 2 H и 2 O (H2O2 - перекись водорода)
    if (elementCounts['H'] === 2 && elementCounts['O'] === 2) {
      return '/reactions/blood_peroxide.gif';
    }

    // Проверяем реакцию Белоусова-Жаботинского: H Br 3 O + 2H C + 2R + H Br

    if (
      elementCounts['H'] === 4 &&
      elementCounts['Br'] === 2 &&
      elementCounts['O'] === 3 &&
      elementCounts['C'] === 1
    ) {
      return '/reactions/Belousov–Zhabotinsky.gif';
    }

    // Проверяем реакцию: 2 Al + 6 I (алюминий и йод)
    if (elementCounts['Al'] === 2 && elementCounts['I'] === 6) {
      return '/reactions/aluminum-iodine.gif';
    }

    // Проверяем наличие радона (Rn)
    if (elementCounts['Rn'] >= 1) {
      return '/reactions/radon.gif';
    }

    if(elementCounts['Fe'] === 1 &&
       elementCounts['Cu'] === 1&&
       elementCounts['S'] === 1 &&
       elementCounts['O'] === 4)
    {
      return 'reactions/iron-copper.gif';
    }
    return null;
  };

  const handleCalculate = () => {
    const gifPath = checkReaction(copiedElements);
    if (gifPath) {
      setReactionGif(gifPath);
    } else {
      console.log('Реакция не найдена для элементов:', copiedElements);
    }
  };

  const handleClear = () => {
    setCopiedElements([]);
    setReactionGif(null);
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Периодическая система</p>
          <h1 className="title">Таблица Менделеева</h1>
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

      <section
        className="bottom-space-wrapper"
        aria-label="Свободное пространство"
      >
        <div className="bottom-main-section">
          <div
            className="bottom-space"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
            onDrop={(e) => {
              e.preventDefault();
              try {
                const data = e.dataTransfer.getData('application/json');
                if (data) {
                  const element = JSON.parse(data);
                  setCopiedElements((prev) => [...prev, element]);
                }
              } catch (err) {
                console.error('Ошибка при обработке drop:', err);
              }
            }}
          >
            <CopiedElements
              elements={copiedElements}
              onRemove={(index) => {
                setCopiedElements((prev) => prev.filter((_, i) => i !== index));
              }}
            />
          </div>
          <ActionPanel
            onAddOperator={(operator) => {
              setCopiedElements((prev) => [...prev, operator]);
            }}
            onCalculate={handleCalculate}
            onClear={handleClear}
          />
        </div>
        <ReactionDisplay
          gifPath={reactionGif}
          onClose={() => setReactionGif(null)}
        />
      </section>
    </div>
  );
}

export default App;
