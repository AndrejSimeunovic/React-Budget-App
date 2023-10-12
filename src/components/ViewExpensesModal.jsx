import React from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, getBudget, deleteExpense, deleteBudget } =
    useBudgets();
  const expenses = getBudgetExpenses(budgetId);
  const budget = getBudget(budgetId);

  function handleDeleteBudget(budgetId) {
    deleteBudget(budgetId);
    handleClose();
  }
  return (
    <>
      {budgetId ? (
        <>
          {" "}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="border rounded-md fixed left-0 right-0 m-auto bg-white max-w-lg ">
            {" "}
            {/** Modal */}
            <div className="flex justify-between items-center border-b p-3">
              <div>
                <span className="text-lg font-medium">
                  Expenses - {budget.name}
                </span>
                {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                  <button
                    onClick={() => handleDeleteBudget(budgetId)}
                    className="border border-red-500 rounded-md p-1 inline-block text-red-500 ml-2 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                )}
              </div>
              <button
                onClick={handleClose}
                className="font-light hover:font-normal"
              >
                X
              </button>
            </div>{" "}
            {/** Modal Head */}
            <div className="p-3 flex flex-col gap-3">
              {" "}
              {/** Modal body */}
              {expenses.map((expense) => {
                return (
                  <div
                    key={expense.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-lg">{expense.description}</span>
                    <div>
                      <span>{currencyFormatter.format(expense.amount)}</span>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="border border-red-500 rounded-sm text-sm p-2 ml-2 hover:bg-red-500 hover:text-white"
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>{" "}
        </>
      ) : null}
    </>
  );
}
