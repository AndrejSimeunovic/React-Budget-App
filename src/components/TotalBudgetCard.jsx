import React from "react";
import { useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const maximum = budgets.reduce((total, budget) => total + budget.maximum, 0);
  if (maximum === 0) return null;

  return (
    <BudgetCard
      amount={amount}
      name={"Total"}
      maximum={maximum}
      gray
      hiddenButton
    />
  );
}
