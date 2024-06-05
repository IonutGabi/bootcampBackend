const elements = [0, 1, false, 2, "", 3];

const isAnObjectWithFalsyValues = (value) =>
  Object.fromEntries(Object.entries(value).filter((value) => value[1]));

const isAnArrayWithFalsyValues = (values) => values.filter((value) => value);

const compact = (arg) => {
  switch (true) {
    case typeof arg !== "object":
      return arg;
    case arg === null:
      return null;
    case Array.isArray(arg):
      return isAnArrayWithFalsyValues(arg);

    case Object.keys(arg).length === 0:
      return arg;
    case typeof arg === "object":
      return isAnObjectWithFalsyValues(arg);
  }
};

console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log(compact({})); // {}
console.log(
  compact({
    price: 0,
    name: "cloud",
    altitude: NaN,
    taste: undefined,
    isAlive: false,
  })
); // {name: "cloud"}
