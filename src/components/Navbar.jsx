import React from "react";

export default function Navbar({ onAddBudgetClick, onViewExpensesClick }) {
  return (
    <div className="flex flex-row items-center">
      {" "}
      {/**nav */}
      <h1 className="text-3xl font-semibold mr-auto">Budgets</h1>
      <button
        onClick={onAddBudgetClick}
        className="border outline-none bg-blue-500 text-white mr-2 rounded-md p-2 inline-block hover:bg-blue-600"
      >
        Add budget
      </button>
      <button
        onClick={onViewExpensesClick}
        className="border border-blue-500 outline-none bg-tranparent text-blue-500 rounded-md p-2 inline-block hover:bg-blue-600 hover:text-white"
      >
        Add Expense
      </button>
    </div>
  );
}
