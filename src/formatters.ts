
// Format schema name (first letter to lower case)
export const formatSchemaName = (name: string) => {
    return name.charAt(0).toLowerCase() + name.slice(1)
}

// 
export function formatDateAsDMY(date: String) {
    const [day, month, year] = date.split('/');
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');

    return `${paddedDay}/${paddedMonth}/${year}`;
}