// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props
  return (
    <div className="money-details-container">
      <div className="balance container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="img"
        />
        <div className="content">
          <p className="heading">Your Balance</p>
          <p className="count" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="income container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="img"
        />
        <div className="content">
          <p className="heading">Your Income</p>
          <p className="count" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="expenses container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="img"
        />
        <div className="content">
          <p className="heading">Your Expenses</p>
          <p className="count" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
