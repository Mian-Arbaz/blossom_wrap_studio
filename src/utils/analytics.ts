interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];

  track(event: AnalyticsEvent) {
    this.events.push({
      ...event,
      timestamp: Date.now()
    } as any);
    
    // Store in localStorage for demo purposes
    const stored = JSON.parse(localStorage.getItem('analytics') || '[]');
    stored.push(event);
    localStorage.setItem('analytics', JSON.stringify(stored.slice(-100))); // Keep last 100 events
    
    console.log('Analytics Event:', event);
  }

  trackPageView(page: string) {
    this.track({
      event: 'page_view',
      category: 'navigation',
      action: 'view',
      label: page
    });
  }

  trackProductView(productId: string, productName: string) {
    this.track({
      event: 'product_view',
      category: 'product',
      action: 'view',
      label: productName,
      value: productId as any
    });
  }

  trackAddToCart(productId: string, productName: string, quantity: number) {
    this.track({
      event: 'add_to_cart',
      category: 'ecommerce',
      action: 'add',
      label: productName,
      value: quantity
    });
  }

  trackSearch(query: string, results: number) {
    this.track({
      event: 'search',
      category: 'search',
      action: 'query',
      label: query,
      value: results
    });
  }

  getEvents() {
    return JSON.parse(localStorage.getItem('analytics') || '[]');
  }
}

export const analytics = new Analytics();