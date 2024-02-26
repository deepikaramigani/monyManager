// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachTransaction, onDelete} = props
  const {id, title, amount, type} = eachTransaction
  const deleteTransaction = () => {
    onDelete(id)
  }

  return (
    <li className="list-item">
      <hr className="line-style" />
      <div className="transaction-item">
        <p>{title}</p>
        <p>Rs {amount}</p>
        <p>{type}</p>
        <button
          type="button"
          className="delete-button"
          onClick={deleteTransaction}
          data-tesid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
