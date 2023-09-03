import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Expense = ({ expenseData, setExpenseData }) => {
  const expensesPerPage=localStorage.getItem('expensesPerPage')

  const buttonRef = useRef(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [chooseExpensesPerPage, setchooseExpensesPerPage] = useState(expensesPerPage);
  localStorage.setItem("expensesPerPage",chooseExpensesPerPage)

  const [fileUrl, setUrl] = useState();
  const [pagiationInfo, setPagiationInfo] = useState();
  console.log("good", currentPageNumber);
  const token = localStorage.getItem("token");
  console.log("url", fileUrl?.fileURL);
  useEffect(() => {
    console.log(token);

    fetch(
      `http://localhost:4000/show-expense?page=${currentPageNumber}&choosepagesize=${chooseExpensesPerPage||2}`,
      {
        headers: { Authorization: token },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setExpenseData(res.expense);
        setPagiationInfo(res);
      });
  }, [currentPageNumber, chooseExpensesPerPage]);
  const handleDeleteExpeses = (id) => {
    const updatedData = expenseData.filter((item) => {
      return item.id !== id;
    });
    setExpenseData(updatedData);

    fetch(`http://localhost:4000/delete-expense/${id}`, {
      headers: { Authorization: token },
    });
  };
  const handleDownload = async () => {
    const data = await fetch("http://localhost:4000/downloadexpenses", {
      headers: { Authorization: token },
    });

    const res = await data.json();
    setUrl(res);
  };
  useEffect(() => {
    fileUrl && buttonRef.current.click();
  }, [fileUrl]);

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
                  {expenseData &&
                    expenseData?.map((item) => (
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
      <div>
        <div className="flex justify-center items-center">
          <span className="mx-2">Number of Expenses per page</span>
          <select
            className="border border-gray-400"
            onChange={(e) => {
              setchooseExpensesPerPage(e.target.value);
            }}
          >
            <option>2</option>

            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
      <div className="flex   mx-[550px] cursor-pointer space-x-4">
        {pagiationInfo?.hasPreviousPage && (
          <button
            onClick={() => {
              setCurrentPageNumber(currentPageNumber - 1);
            }}
          >
            {pagiationInfo?.currentPage - 1}
          </button>
        )}
        <button className="font-bold">{pagiationInfo?.currentPage}</button>
        {pagiationInfo?.hasNextPage && (
          <button
            onClick={() => {
              setCurrentPageNumber(pagiationInfo.nextPage);
            }}
          >
            {pagiationInfo?.nextPage}
          </button>
        )}
        {currentPageNumber !== pagiationInfo?.lastPage &&
          currentPageNumber + 1 !== pagiationInfo?.lastPage && (
            <div>
              ......
              <button
                onClick={() => {
                  setCurrentPageNumber(pagiationInfo.lastPage);
                }}
              >
                {pagiationInfo?.lastPage}
              </button>
            </div>
          )}
      </div>

      {fileUrl && <Link to={fileUrl?.fileURL} ref={buttonRef} />}
      <button
        className=" mx-[550px] my-2 p-2 bg-blue-700"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
};

export default Expense;
