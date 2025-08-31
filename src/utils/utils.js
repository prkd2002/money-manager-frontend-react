export const addThousandsSeperator = (num) => {
    if (num == null || isNaN(num)) return "";

    // Convertir le nombre en string
    const numStr = num.toString();
    const parts = numStr.split(".");

    let integerPart = parts[0];
    let fractionalPart = parts[1] || "";

    // Ajouter séparateurs de milliers européens (point)
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Utiliser la virgule comme séparateur décimal
    return fractionalPart
        ? `${integerPart},${fractionalPart}`
        : integerPart;
};


export const prepareIncomeLineChartData = (transactions) => {
    if (!Array.isArray(transactions)) return [];

    // Regrouper par date exacte
    const grouped = transactions.reduce((acc, tx) => {
        const dateKey = tx.date; // format "YYYY-MM-DD"
        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: dateKey,
                totalAmount: 0,
                items: []
            };
        }

        acc[dateKey].totalAmount += tx.amount;
        acc[dateKey].items.push(tx);

        return acc;
    }, {});

    // Transformer en array trié par date
    return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
};


