import React, { useRef } from "react";
import { useBudgets } from "../context/BudgetContext";

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maximumRef = useRef();
  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      maximum: parseFloat(maximumRef.current.value),
    });
    handleClose();
  }
  return (
    <>
      {show ? (
        <>
          {" "}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="border rounded-md fixed left-0 right-0 m-auto bg-white max-w-lg">
            {" "}
            {/** Modal */}
            <div className="flex justify-between items-center border-b p-3">
              <span className="text-lg font-medium">New Budget</span>
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
                  <label className="block mb-2" htmlFor="Name">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    className="border rounded-sm w-full pl-2 py-1"
                    type="text"
                    id="Name"
                    name="Name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2" htmlFor="Maximum">
                    Maximum Spending
                  </label>
                  <input
                    ref={maximumRef}
                    className="border rounded-sm w-full pl-2 py-1"
                    type="number"
                    min={0}
                    id="Maximum"
                    name="Maximum"
                    required
                  />
                </div>
                <button
                  className="outline-none bg-blue-500 text-white  rounded-md py-2 px-3 inline-block ml-auto hover:bg-blue-600"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          </div>{" "}
        </>
      ) : null}
    </>
  );
}
