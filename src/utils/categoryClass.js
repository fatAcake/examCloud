export const characteristicClass = (value = '') => {
  const key = value.toLowerCase();
  if (key.includes('инерт')) return 'cat-inert';
  if (key.includes('галоген')) return 'cat-halogen';
  if (key.includes('щелочной')) return 'cat-alkali';
  if (key.includes('щелочноземель')) return 'cat-alkaline-earth';
  if (key.includes('переход')) return 'cat-transition';
  if (key.includes('лантан')) return 'cat-lanthanide';
  if (key.includes('актиноид')) return 'cat-actinide';
  if (key.includes('металлоид')) return 'cat-halogen';
  if (key.includes('немет')) return 'cat-halogen';
  if (key.includes('металл')) return 'cat-metal';
  return 'cat-halogen';
};

