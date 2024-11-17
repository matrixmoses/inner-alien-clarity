import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold mb-4">Oops, something went wrong!</h1>
          <p className="text-gray-600 mb-8">We're sorry for the inconvenience. Please try again.</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}