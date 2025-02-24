import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import ExpenseTable from "./ExpenseTable";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseForm from "./ExpenseForm";
import Charts from "./Charts"; 
import { motion } from "framer-motion";
import TransactionModal from "../components/TransactionModal";
import { Button } from "react-bootstrap";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSubmit = (data) => {
    console.log("Transaction Submitted:", data);
  };

  const [filterText, setFilterText] = useState("");

  function handleFilterChange(e) {
    setFilterText(e.target.value);
  }

  const filteredExpenses = expenses.filter((expense) =>
    expense.text.toLowerCase().includes(filterText.toLowerCase())
  );
  
  <ExpenseTable
    expenses={filteredExpenses}
    deleteExpens={(id) => setExpenses(expenses.filter(exp => exp._id !== id))}
  />
  
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => navigate("/login"), 1000);
  };

  useEffect(() => {
    if (loggedInUser) {
      const amounts = expenses.map((item) => item.amount);
      const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0);
      const exp = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1;
      setIncomeAmt(income);
      setExpenseAmt(exp);
    }
  }, [expenses, loggedInUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
        <div className="fade-in">
          <div className="home-container" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              textAlign: "center",
              backgroundColor: "#F3E5F5",
              color: "#4A148C"
            }}>
              <h1 style={{ color: "#4A148C", textAlign: "center", marginBottom: "20px", fontFamily: "monospace" }}>
              Personal Expense Manager
              </h1>
              <h2>Welcome {loggedInUser || "Guest"}</h2>
              {loggedInUser && <Charts income={incomeAmt} expense={expenseAmt} />}
              <div>
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={filterText}
                  onChange={handleFilterChange}
                  style={{
                    width: "200px",
                    padding: "8px",
                    margin: "10px 0",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            <div className="user-section">
              <Button variant="primary" onClick={handleOpen}>Add New</Button>
              <TransactionModal show={showModal} handleClose={handleClose} handleSubmit={handleSubmit} />
              

              {loggedInUser ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <></>
              )}
              
            </div>
          
            {loggedInUser ? (
              <>
                <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
                <ExpenseForm addTransaction={(data) => setExpenses([...expenses, data])} />
                <ExpenseTable expenses={expenses} deleteExpens={(id) => setExpenses(expenses.filter(exp => exp._id !== id))} />
              </>
            ) : (
              
              <p>Please log in to manage your expenses.</p>
              

            )}
            <div style={{ marginTop: "20px" }}>
                <button 
                  onClick={() => navigate("/login")} 
                  style={{
                    backgroundColor: "#6A1B9A",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontSize: "18px",
                  }}>
                  Login
                </button>
            </div>
            <ToastContainer />
        </div>
      </div>
    </motion.div>
  );
}

export default Home;