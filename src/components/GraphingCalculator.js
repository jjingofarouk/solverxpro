import React, { useEffect, useRef } from 'react';
import '../styles/GraphingCalculator.css';

const GraphingCalculator = ({ expressions, onExpressionSelect }) => {
  const calculatorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
      expressions: true,
      settingsMenu: false,
      zoomButtons: true,
    });

    return () => {
      if (calculatorRef.current) {
        calculatorRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (calculatorRef.current) {
      calculatorRef.current.setExpressions(expressions);
    }
  }, [expressions]);

  return <div ref={containerRef} className="graphing-calculator" />;
};

export default GraphingCalculator;