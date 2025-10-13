const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const calculateItems = (items) => {
  return items.reduce(
    (acc, { price = 0, quantity = 0 }) => acc + price * quantity,
    0
  );
};

const calculatePizza = (dough, sauce, size, ingredients = []) => {
  const ingredientsSum = calculateItems(ingredients);

  return (dough?.price + sauce?.price + ingredientsSum) * size?.multiplier;
};

export { capitalize, calculateItems, calculatePizza };
