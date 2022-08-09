const addSelectedProps = (item) => ({ ...item, selected: false });
const addCountProps = (item) => ({ ...item, count: 0 });

export { addSelectedProps, addCountProps };
