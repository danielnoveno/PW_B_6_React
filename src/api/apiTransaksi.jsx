import api from './index';

export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transaksi', transactionData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create transaction' };
  }
};

export const getMyTransactions = async () => {
  try {
    const response = await api.get('/transaksi');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch transactions' };
  }
};

export const getTransactionById = async (id) => {
  try {
    const response = await api.get(`/transaksi/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch transaction details' };
  }
};