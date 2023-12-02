import { ListingData } from "../../api/database-requests";

export const calculateTotalAmountByCategory = (listings: ListingData[]): { category: string; totalAmount: number }[] => {
    const categoryMap: { [key: string]: number } = {};

    listings.forEach((listing) => {
        const { category, amount } = listing;

        if (categoryMap[category]) {
            categoryMap[category] += amount;
        } else {
            categoryMap[category] = amount;
        }
    });
    const result = Object.keys(categoryMap).map((category) => ({
        category,
        totalAmount: categoryMap[category],
    }));

    return result;
};
export const calculateTotalAmountByUser = (listings: ListingData[]): { userNickName: string; totalAmount: number }[] => {
    const userMap: { [key: string]: number } = {};

    listings.forEach((listing) => {
        const { userNickName, amount } = listing;

        if (userMap[userNickName]) {
            userMap[userNickName] += amount;
        } else {
            userMap[userNickName] = amount;
        }
    });

    const result = Object.keys(userMap).map((userNickName) => ({
        userNickName,
        totalAmount: userMap[userNickName],
    }));

    return result;
};
export const calculateBudgetWastedPercentage = (totalAmountByCategory: { category: string; totalAmount: number }[], budget: number): { category: string; percentage: number }[] => {
    const result = totalAmountByCategory.map(({ category, totalAmount }) => ({
        category,
        percentage: (totalAmount / budget) * 100,
    }));

    return result;
};
export const calculatePercentageSpent = (totalAmountSpent: number, budget: number): number => {
    const percentageSpent = (totalAmountSpent / budget) * 100;
    return percentageSpent;
  };