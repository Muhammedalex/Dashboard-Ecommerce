
import React from 'react';
class ErrorWrap extends React.Component {
    componentDidCatch(error, info) {
      console.error('Error caught by error boundary:', error, info);
    }
  
    render() {
      return this.props.children;
    }
  }

  export default ErrorWrap