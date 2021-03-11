import React from 'react';

class NotefulErrors extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true};
  }
  render() {
    if(this.state.hasError) {
      return <h2>Page could not be displayed at this time</h2>
    }
    return this.props.children;
  }
}

export default NotefulErrors;