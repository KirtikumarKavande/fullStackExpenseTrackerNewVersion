import React, { useRef, useState } from "react";
import Expenses from "./Expenses";

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState([]);

  const titleRef = useRef();
  const categoryRef = useRef();
  const amountRef = useRef();

  const handleAddexpenseSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const title = titleRef.current.value;
    const category = categoryRef.current.value;
    const amount = amountRef.current.value;
    const obj = { title, category, amount };

    setExpenseData([...expenseData, obj]);

    fetch("http://localhost:4000/add-expense", {
      method: "POST",
      headers: { "content-type": "application/json", "Authorization": token },
      body: JSON.stringify(obj),
    });
    console.log(obj);
    titleRef.current.value = "";
    categoryRef.current.value = "";
    amountRef.current.value = "";
  };

  return (
    <>
      <form
        className=" flex flex-col w-96 m-auto space-y-3 p-3 border border-gray-400 shadow-lg bg-slate-300 mt-24 rounded-md "
        onSubmit={handleAddexpenseSubmit}
      >
        <label>Title</label>
        <input
          placeholder="title of Expense"
          type="text"
          className="border border-black p-2"
          ref={titleRef}
        />
        <label for="cars">Category</label>

        <select className="border border-black" ref={categoryRef}>
          <option>not selected</option>

          <option>Grocery</option>
          <option>Game</option>
          <option>Party</option>
          <option>Daily Essential</option>
        </select>
        <label>Amount</label>
        <input
          type="number"
          className="border border-black p-2 "
          placeholder="amount spend"
          ref={amountRef}
        />
        <button className="p-2 bg-green-600">Add Expense</button>
      </form>
      <Expenses setExpenseData={setExpenseData} expenseData={expenseData} />
    </>
  );
};

export default AddExpense;
