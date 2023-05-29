import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpensesApi, getCurrenciesApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clearInputs = () => {
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(getExpensesApi(expense));
    this.clearInputs();

    document.getElementById('value').value = '';
    document.getElementById('description').value = '';
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">Valor:</label>
        <input
          type="number"
          data-testid="value-input"
          id="value"
          name="value"
          onChange={ this.handleChange }
        />

        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          data-testid="description-input"
          id="description"
          name="description"
          onChange={ this.handleChange }
        />

        <label htmlFor="currency">Moeda:</label>
        <select
          data-testid="currency-input"
          id="currency"
          name="currency"
          onChange={ this.handleChange }
        >
          {currencies.map((moeda) => (
            <option value={ moeda } key={ moeda }>{moeda}</option>
          ))}
        </select>

        <label htmlFor="method">Método de pagamento:</label>
        <select
          data-testid="method-input"
          id="method"
          name="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <label htmlFor="tag">Categoria:</label>
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  idToEdit: wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
