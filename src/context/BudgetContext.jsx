import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const budgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(budgetContext);
}

export const BudgetProvider = function ({ children }) {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function addBudget({ name, maximum }) {
    setBudgets((prev) => {
      if (prev.find((budget) => budget.name === name)) {
        return prev;
      }
      return [...prev, { id: crypto.randomUUID(), name, maximum }];
    });
  }

  function getBudget(budgetId) {
    const budget =
      UNCATEGORIZED_BUDGET_ID === budgetId
        ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find((b) => b.id === budgetId);
    return budget;
  }

  function deleteBudget(budgetId) {
    setExpenses((prev) => {
      return prev.map((expense) => {
        if (expense.budgetId !== budgetId) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prev) => {
      return prev.filter((budget) => budget.id !== budgetId);
    });
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prev) => {
      return [
        ...prev,
        { id: crypto.randomUUID(), description, amount, budgetId },
      ];
    });
  }

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function deleteExpense(expenseId) {
    setExpenses((prev) => {
      return prev.filter((expense) => expense.id !== expenseId);
    });
  }

  return (
    <budgetContext.Provider
      value={{
        addBudget,
        budgets,
        getBudget,
        deleteBudget,
        addExpense,
        getBudgetExpenses,
        deleteExpense,
        expenses,
      }}
    >
      {children}
    </budgetContext.Provider>
  );
};
