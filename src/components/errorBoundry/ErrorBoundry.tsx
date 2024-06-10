import React, { Component } from 'react';

type PropTypes = {
  children: React.ReactNode;
};
type StateTypes = {
  hasError: React.ReactNode;
};

export default class ErrorBoundry extends Component<PropTypes, StateTypes> {
  state: Readonly<StateTypes> = {
    hasError: false,
  };
  componentDidCatch(error: Error): void {
    if (error) {
      this.setState({ hasError: true });
    }
  }
  render() {
    if (this.state.hasError) return <>something went wrong</>;
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

// отстилизовать ERROR boudry
