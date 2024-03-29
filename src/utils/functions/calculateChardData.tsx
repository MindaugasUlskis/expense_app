import { ListingData } from "../../api/database-requests";
import { generateDateCodes } from "./dateCodeGenerator";


export type UserCategorySpending = {
    dateCode: string,
    amountSum: number,
    user: string
}

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

export function calculateSumForDateAndCategory(
    data: ListingData[],
    chosenDateCode: string,
    chosenCategory: string
  ): number {

    const filteredData = data.filter(
      (item) => item.dateCode === chosenDateCode && item.category === chosenCategory
    );

    const sum = filteredData.reduce((accumulator, item) => accumulator + item.amount, 0);
  
    return sum;
  }

  export function getUserCategorySpending(listingData: ListingData[]): UserCategorySpending[] {
    const result: UserCategorySpending[] = [];
  

    const userDateCodeMap: Map<string, Map<string, number>> = new Map();

    for (const data of listingData) {
      const { user, dateCode, amount } = data;

      if (!userDateCodeMap.has(user)) {
        userDateCodeMap.set(user, new Map());
      }

      const userMap = userDateCodeMap.get(user) ?? new Map();
  
e
      
      userMap.set(dateCode, (userMap.get(dateCode) || 0) + amount);
    }
  

    userDateCodeMap.forEach((userMap, user) => {
      userMap.forEach((amountSum, dateCode) => {
        result.push({ user, dateCode, amountSum });
      });
    });
  
    return result;
  }
  export type UserAmountSummary = { user: string; amounts: number[] }[];
  export function getUserAmountSumForSpecificCategory(listings: ListingData[], category: string, lenght: number): UserAmountSummary {
    const userAmountMap: Map<string, Map<string, number>> = new Map();
    const dateCodes = generateDateCodes(lenght)
  

    for (const listing of listings) {
      if (listing.category === category) {
        const { userNickName, dateCode, amount } = listing;
  
        if (!userAmountMap.has(userNickName)) {
          userAmountMap.set(userNickName, new Map());
        }
  
        const userMap = userAmountMap.get(userNickName) || new Map();
        userMap.set(dateCode, (userMap.get(dateCode) || 0) + amount);
      }
    }
  

    const result: UserAmountSummary = Array.from(userAmountMap.entries()).map(([user, userMap]) => ({
        user,
        amounts: dateCodes.map(dateCode => userMap.get(dateCode) || 0),
      }));
  
    return result;
  }