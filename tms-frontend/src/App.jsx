import { useEffect, useState } from "react";
import "./App.css";

import AddTransactionModal from "./components/AddTransactionModal";
import TransactionTable from "./components/TransactionTable";
import {
  fetchTransactions,
  createTransaction,
} from "./services/transactionApi";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // max number of rows for pagination

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await fetchTransactions();
      setTransactions(data);
    } catch (error) {
      setErrorMessage("Unable to load transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateTransaction(transactionData) {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await createTransaction(transactionData);
      await loadTransactions();

      setIsModalOpen(false);
      setCurrentPage(1); // returning to the first page
    } catch (error) {
      console.error("Create transaction error:", error);
      setErrorMessage("Unable to create transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  }
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  function goToPreviousPage() {
    setCurrentPage((previousPage) => Math.max(previousPage - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((previousPage) => Math.min(previousPage + 1, totalPages));
  }

  return (
    <div className="app-container">
      <div className="content-card">
        <div className="page-header">
          <div>
            <h1>Transaction Management System (TMS)</h1>
            <p>View all transactions and add a new one using the modal form.</p>
          </div>

          <button className="primary-button" onClick={openModal}>
            Add Transaction
          </button>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {isLoading ? (
          <p className="loading-text">Loading transactions...</p>
        ) : (
          <>
            <TransactionTable transactions={paginatedTransactions} />

            <div className="pagination">
              <button
                className="secondary-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                className="secondary-button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateTransaction}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default App;
