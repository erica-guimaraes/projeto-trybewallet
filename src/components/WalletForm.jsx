import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesApi } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesApi());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">Valor:</label>
        <input
          type="text"
          data-testid="value-input"
          id="value"
        />

        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          data-testid="description-input"
          id="description"
        />

        <label htmlFor="currency">Moeda:</label>
        <select
          data-testid="currency-input"
          id="currency"
        >
          {currencies.map((moeda) => (
            <option value={ moeda } key={ moeda }>{moeda}</option>
          ))}
        </select>

        <label htmlFor="method">Método de pagamento:</label>
        <select
          data-testid="method-input"
          id="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <label htmlFor="tag">Categoria:</label>
        <select
          data-testid="tag-input"
          id="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
