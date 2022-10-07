import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddEmail } from '../redux/actions';
import '../styles/login.css';

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
      <form onSubmit={ this.handleSubmit } className="container">
        <h1 className="titleLogin">
          Trybe Wallet
          <i className="fa-solid fa-wallet" />
        </h1>
        <div htmlFor="email" className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input is-rounded"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              onChange={ this.handleChange }
              data-testid="email-input"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>

          </p>

        </div>

        <div htmlFor="password" className="field">
          <p className="control has-icons-left">
            <input
              className="input is-rounded"
              placeholder="Senha"
              type="password"
              name="password"
              id="password"
              onChange={ this.handleChange }
              data-testid="password-input"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control">
            <button
              className="button is-success"
              type="submit"
              disabled={ isDisabled }
            >
              Entrar

            </button>
          </p>

        </div>
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
