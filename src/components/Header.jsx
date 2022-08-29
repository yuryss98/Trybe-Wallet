import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, value } = this.props;
    const roundNumber = Math.round((value + Number.EPSILON) * 100) / 100;

    return (
      <div>
        <h3 data-testid="email-field">{ user }</h3>
        <h3 data-testid="total-field">{ roundNumber }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  value: state.wallet.sumExpenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
