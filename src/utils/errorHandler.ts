// Global error handling utility
export class ErrorHandler {
  static logError(error: Error, context?: string) {
    console.error(`[${context || 'App'}] Error:`, error);
    
    // In production, you would send this to an error tracking service
    // like Sentry, LogRocket, etc.
  }

  static handleAsyncError(promise: Promise<any>, context?: string) {
    return promise.catch(error => {
      this.logError(error, context);
      throw error;
    });
  }

  static createErrorBoundary(fallback: React.ComponentType<any>) {
    return class extends React.Component {
      constructor(props: any) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error: any) {
        return { hasError: true };
      }

      componentDidCatch(error: any, errorInfo: any) {
        ErrorHandler.logError(error, 'ErrorBoundary');
      }

      render() {
        if ((this.state as any).hasError) {
          return React.createElement(fallback);
        }
        return this.props.children;
      }
    };
  }
}

// Performance monitoring
export class PerformanceMonitor {
  static measurePageLoad() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          console.log('Page Load Performance:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            totalTime: perfData.loadEventEnd - perfData.fetchStart
          });
        }, 0);
      });
    }
  }

  static measureComponentRender(componentName: string, renderTime: number) {
    if (renderTime > 16) { // More than one frame
      console.warn(`Slow render detected in ${componentName}: ${renderTime}ms`);
    }
  }
}