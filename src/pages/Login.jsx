import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  checkToDisableButton = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const validPassword = password.length >= minLength;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const disableButton = !(validPassword && validEmail);
    this.setState({
      isDisabled: disableButton,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.checkToDisableButton);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <form>
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
