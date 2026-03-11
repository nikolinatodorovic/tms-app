import { useState } from "react";

const initialFormData = {
  transaction_date: "",
  account_number: "",
  account_holder_name: "",
  amount: "",
};

function TransactionForm({ onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="transaction_date">Transaction Date</label>
        <input
          id="transaction_date"
          name="transaction_date"
          type="date"
          value={formData.transaction_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="account_number">Account Number</label>
        <input
          id="account_number"
          name="account_number"
          type="text"
          value={formData.account_number}
          onChange={handleChange}
          pattern="\d{4}-\d{4}-\d{4}"
          title="Account number must be in format XXXX-XXXX-XXXX"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="account_holder_name">Account Holder Name</label>
        <input
          id="account_holder_name"
          name="account_holder_name"
          type="text"
          value={formData.account_holder_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
