export const SortDirection = {
    ASC: "ASC",
    DESC: "DESC",
};

export const sorterBy = (direction = SortDirection.ASC, criteria) => (a, b) => {
    const valueA = typeof criteria === "function" ? criteria(a) : a[criteria];
    const valueB = typeof criteria === "function" ? criteria(b) : b[criteria];

    if (valueA > valueB) {
        return direction === SortDirection.ASC ? 1 : -1;
    }
    if (valueB > valueA) {
        return direction === SortDirection.ASC ? -1 : 1;
    }
    return 0;
};

export const groupBy = (arr, criteria) => {
    return arr.reduce((obj, item) => {
        // Check if the criteria is a function to run on the item or a property of it
        const key =
            typeof criteria === "function" ? criteria(item) : item[criteria];

        // If the key doesn't exist yet, create it
        if (!obj.hasOwnProperty(key)) {
            obj[key] = [];
        }

        // Push the value to the object
        obj[key].push(item);

        // Return the object to the next item in the loop
        return obj;
    }, {});
};
