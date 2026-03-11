import StatusBadge from "./StatusBadge";

function TransactionTable({ transactions }) {
  if (!transactions.length) {
    return <p className="empty-state">No transactions available.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Account Number</th>
            <th>Account Holder Name</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={`${transaction.account_number}-${transaction.transaction_date}-${index}`}
            >
              <td>{transaction.transaction_date}</td>
              <td>{transaction.account_number}</td>
              <td>{transaction.account_holder_name}</td>
              <td>${Number(transaction.amount).toFixed(2)}</td>
              <td>
                <StatusBadge status={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
