export const date_transformer = {
    from: (value?: Date | null) =>
        value === undefined || value === null ? value : value.toISOString(),
    to: (value?: string | null) =>
        value === undefined || value === null ? value : new Date(value),
};
