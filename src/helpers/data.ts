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

type Grouped<T> = Record<string, T[]>;

export function groupBy<T>(array: T[], key: string | number | ((item: T) => string | number)): Grouped<T> {
  return array.reduce((result: Grouped<T>, item: T) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {});
}