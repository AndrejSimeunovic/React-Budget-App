import React, { useRef } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const { budgets, addExpense } = useBudgets();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }
  return (
    <>
      {show ? (
        <>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="border rounded-md fixed left-0 right-0 m-auto bg-white max-w-lg ">
            {" "}
            {/** Modal */}
            <div className="flex justify-between items-center border-b p-3">
              <span className="text-lg font-medium">New Expense</span>
              <button
                onClick={handleClose}
                className="font-light hover:font-normal"
              >
                X
              </button>
            </div>{" "}
            {/** Modal Head */}
            <div className="p-3">
              {" "}
              {/** Modal body */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="">
                  <label className="block mb-2" htmlFor="Description">
                    Description
                  </label>
                  <input
                    className="border rounded-sm w-full pl-2 py-1"
                    type="text"
                    id="Description"
                    name="Description"
                    ref={descriptionRef}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2" htmlFor="Amount">
                    Amount
                  </label>
                  <input
                    className="border rounded-sm w-full pl-2 py-1"
                    type="number"
                    min={0}
                    id="Amount"
                    name="Amount"
                    ref={amountRef}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2" htmlFor="Budget">
                    Budget
                  </label>
                  <select
                    className="border rounded-sm w-full pl-2 py-1"
                    min={0}
                    defaultValue={defaultBudgetId}
                    ref={budgetIdRef}
                  >
                    <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>

                    {budgets.map((budget) => {
                      return (
                        <option key={budget.id} value={budget.id}>
                          {budget.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button
                  className="outline-none bg-blue-500 text-white  rounded-md py-2 px-3 inline-block ml-auto hover:bg-blue-600"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
