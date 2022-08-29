import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.inputsIsValidated();
    });
  };

  inputsIsValidated = () => {
    const { email, password } = this.state;

    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    const minLengthForPassword = 6;
    const passwordIsValid = password.length >= minLengthForPassword;

    if (emailIsValid && passwordIsValid) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;

    dispatch(actionAddEmail(email));

    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            id="password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>

        <button
          type="submit"
          disabled={ isDisabled }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
