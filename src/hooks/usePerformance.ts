import { useEffect, useRef } from 'react';
import { PerformanceMonitor } from '../utils/errorHandler';

export const usePerformance = (componentName: string) => {
  const renderStartTime = useRef<number>();

  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      PerformanceMonitor.measureComponentRender(componentName, renderTime);
    }
  });
};

export const usePageLoad = () => {
  useEffect(() => {
    PerformanceMonitor.measurePageLoad();
  }, []);
};