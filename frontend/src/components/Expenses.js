import React, { useEffect, useState } from "react";

const Expense = ({ expenseData, setExpenseData }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    fetch("http://localhost:4000/show-expense", {
      headers: { Authorization: token },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setExpenseData(res);
      });
  }, []);
  const handleDeleteExpeses = (id) => {
    const token = localStorage.getItem("token");

    const updatedData = expenseData.filter((item) => {
      return item.id !== id;
    });
    setExpenseData(updatedData);

    fetch(`http://localhost:4000/delete-expense/${id}`, {
      headers: { "Authorization": token },
    });
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      amount
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData.map((item) => (
                    <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.amount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        <button
                          className="mr-8"
                          onClick={() => {
                            handleDeleteExpeses(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;