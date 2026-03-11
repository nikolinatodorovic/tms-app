const API_BASE_URL = "http://127.0.0.1:8000"; // backend app

export async function fetchTransactions() {
  const response = await fetch(`${API_BASE_URL}/transactions`);

  if (!response.ok) {
    throw new Error("Failed to fetch transactions.");
  }

  return response.json();
}

export async function createTransaction(transactionData) {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionData), // converting js object into json
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction.");
  }

  return response.json();
}
