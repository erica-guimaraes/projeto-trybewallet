import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  componentDidMount() {
    const { expenses } = this.props;
    console.log(expenses);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {expenses.reduce((acc, curr) => {
            const { currency } = curr;
            const rateCurrentCurrency = curr.exchangeRates[currency].ask;
            const expenseAmount = (Number(curr.value) * Number(rateCurrentCurrency));
            return acc + expenseAmount;
          }, 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      ask: PropTypes.number,
    }),
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
