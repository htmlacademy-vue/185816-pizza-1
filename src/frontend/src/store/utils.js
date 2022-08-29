const addSelectedProps = (item) => ({ ...item, selected: false });
const addCountProps = (item) => ({ ...item, count: 0, selected: false });

export { addSelectedProps, addCountProps };
