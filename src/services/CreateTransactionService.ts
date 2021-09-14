import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === "outcome" && total < value) {
      throw new Error('You dont have enough money');
    }

    const transaction= this.transactionsRepository.create({title, value, type});

    return transaction;
  }
}

export default CreateTransactionService;
