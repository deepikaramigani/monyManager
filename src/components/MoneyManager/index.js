import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    balance: 0,
    income: 0,
    expenses: 0,
    transactionList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeOption = event => {
    this.setState({type: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {title, amount, type} = this.state
    if (title !== '' && amount !== 0) {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount,
        type,
      }
      if (type === 'INCOME') {
        this.setState(prevState => ({
          balance: parseInt(prevState.balance) + parseInt(amount),
          income: parseInt(prevState.income) + parseInt(amount),
        }))
      }
      if (type === 'EXPENSES') {
        this.setState(prevState => ({
          balance: parseInt(prevState.balance) - parseInt(amount),
          income: parseInt(prevState.income) - parseInt(amount),
          expenses: parseInt(prevState.expenses) + parseInt(amount),
        }))
      }
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newTransaction],
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onDelete = id => {
    const {transactionList} = this.state
    const deletedObject = transactionList.find(each => each.id === id)
    const listAfterDeleting = transactionList.filter(each => each.id !== id)
    this.setState({transactionList: listAfterDeleting})
    if (deletedObject.type === 'INCOME') {
      this.setState(prevState => ({
        balance: parseInt(prevState.balance) - parseInt(deletedObject.amount),
        income: parseInt(prevState.income) - parseInt(deletedObject.amount),
      }))
    }
    if (deletedObject.type === 'EXPENSES') {
      this.setState(prevState => ({
        balance: parseInt(prevState.balance) + parseInt(deletedObject.amount),
        income: parseInt(prevState.income) + parseInt(deletedObject.amount),
        expenses: parseInt(prevState.expenses) - parseInt(deletedObject.amount),
      }))
    }
  }

  render() {
    const {
      title,
      amount,
      type,
      balance,
      income,
      expenses,
      transactionList,
    } = this.state
    return (
      <div className="bg-container">
        <div className="money-manager">
          <h1 className="heading">Hi, Richard</h1>
          <p className="heading">
            Welcome back to your <span className="span">Money Manger</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div className="form-transaction-container">
          <div className="form-container">
            <form onSubmit={this.onAddTransaction}>
              <h2 className="heading">Add Transaction</h2>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                className="input-style"
                type="text"
                id="title"
                placeholder="TITLE"
                value={title}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                className="input-style"
                id="amount"
                placeholder="AMOUNT"
                value={amount}
                onChange={this.onChangeAmount}
              />
              <label htmlFor="select" className="label">
                Type
              </label>
              <select
                id="select"
                value={type}
                className="input-style"
                onChange={this.onChangeOption}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h2 className="heading">History</h2>
            <div className="history-border">
              <div className="history">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <p>.....</p>
              </div>
              <ul className="padding">
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    eachTransaction={eachTransaction}
                    key={eachTransaction.id}
                    onDelete={this.onDelete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
