import React from "react";
import { currencyFormatter } from "../utils";

export default function BudgetCard({
  name,
  maximum,
  onAddExpenseClick,
  onViewExpensesClick,
  amount,
  gray,
  hiddenButton,
}) {
  function progressBar(amount, maximum) {
    let color;
    let ratio = amount / maximum;
    if (ratio < 0.5) {
      color = "bg-blue-500";
    } else if (ratio < 0.75) {
      color = "bg-orange-500";
    } else {
      color = "bg-red-500";
    }
    return color;
  }
  return (
    <div
      className={`border rounded-md ${
        gray ? "bg-gray-100" : null
      } py-3 px-3 my-4 flex flex-col gap-3 ${
        maximum && amount > maximum ? "bg-red-200" : ""
      }`}
    >
      {" "}
      {/** A Budget container */}
      <div className="flex justify-between items-center">
        {" "}
        {/** label and price */}
        <span className="font-medium">{name}</span>
        <span>
          <span className="font-normal text-lg">
            {currencyFormatter.format(amount)}
          </span>{" "}
          {maximum ? (
            <span className="text-slate-500 text-sm">
              / {currencyFormatter.format(maximum)}
            </span>
          ) : null}
        </span>
      </div>
      {maximum ? (
        <div className="w-full h-4 bg-gray-200 rounded-full">
          {" "}
          {/** progressbar */}
          <div
            className={`h-4 ${progressBar(
              amount,
              maximum
            )} rounded-full duration-500`}
            style={{
              width: `${amount >= maximum ? "100" : (amount / maximum) * 100}%`,
            }}
          ></div>
        </div>
      ) : null}
      {!hiddenButton && (
        <div>
          {" "}
          {/** add/view expense container */}
          <button
            onClick={onAddExpenseClick}
            className="border mr-2 border-blue-500 outline-none bg-tranparent text-blue-500 rounded-md p-2 hover:bg-blue-600 hover:text-white"
          >
            Add expense
          </button>
          <button
            onClick={onViewExpensesClick}
            className="border border-gray-500 outline-none bg-tranparent text-gray-500 rounded-md p-2 hover:bg-gray-600 hover:text-white"
          >
            View expenses
          </button>
        </div>
      )}
    </div>
  );
}
