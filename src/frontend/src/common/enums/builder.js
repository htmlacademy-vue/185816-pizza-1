import Resources from "@/common/enums/resources";

export const BuilderCollection = {
  DOUGH: Resources.DOUGHS,
  SAUCES: Resources.SAUCES,
  INGREDIENTS: Resources.INGREDIENTS,
  SIZES: Resources.SIZES,
};

export const Limit = {
  COUNT_MAX: 3,
  COUNT_MIN: 0,
  COUNT_STEP: 1,
};

export const DefaultValue = {
  [Resources.DOUGHS]: 1,
  [Resources.SAUCES]: 0,
  [Resources.INGREDIENTS]: -1,
  [Resources.SIZES]: 0,
};
