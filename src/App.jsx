import Navbar from "./components/Navbar";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import AddExpenseModal from "./components/AddExpenseModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setAddExpenseModalBudgetId(budgetId);
    setShowAddExpenseModal(true);
  }
  return (
    <div className="container-md mx-auto max-w-3xl my-4 px-5 relative">
      {" "}
      {/** app */}
      <Navbar
        onAddBudgetClick={() => setShowAddBudgetModal(true)}
        onViewExpensesClick={openAddExpenseModal}
      />
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        handleClose={() => setViewExpensesModalBudgetId()}
        budgetId={viewExpensesModalBudgetId}
      />
      <div className="grid grid-cols-1 ">
        {" "}
        {/**grid of budgets */}
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => {
              return total + expense.amount;
            },
            0
          );

          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              maximum={budget.maximum}
              amount={amount}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(budget.id)
              }
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          onViewExpensesClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
        <TotalBudgetCard />
      </div>
    </div>
  );
}

export default App;
