import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FooterSection } from './components/ui/footer-section.tsx';

const financeData = [
  { month: 'mai', value: 198.4 },
  { month: 'jun', value: 224.8 },
  { month: 'jul', value: 216.2 },
  { month: 'ago', value: 241.6 },
  { month: 'set', value: 236.1 },
  { month: 'out', value: 262.4 },
  { month: 'nov', value: 251.7 },
  { month: 'dez', value: 284.6 },
];

function useInView(ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // Keep the state tied to viewport presence so the entrance can replay
      // when the visitor leaves the section and comes back.
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.35 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

function formatMoney(value) {
  return `R$ ${value.toFixed(1).replace('.', ',')}k`;
}

function FinanceChart() {
  const chartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const isVisible = useInView(chartRef);
  const max = Math.max(...financeData.map((item) => item.value));
  const activeItem = activeIndex === null ? null : financeData[activeIndex];

  return (
    <div ref={chartRef} className={`finance-chart react-finance-chart ${isVisible ? 'is-chart-visible' : ''}`}>
      <div className="chart-labels"><span>Receita</span><b>R$ 284,6k</b></div>
      <div className="chart-bars" role="list" aria-label="Receita por mês">
        {financeData.map((item, index) => (
          <button
            key={item.month}
            type="button"
            className={`react-chart-bar ${activeIndex === index ? 'is-active' : ''}`}
            style={{ '--bar-height': `${(item.value / max) * 100}%`, '--bar-delay': `${index * 70}ms` }}
            aria-label={`${item.month}: ${formatMoney(item.value)}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
          />
        ))}
      </div>
      <div className="chart-axis">{financeData.map((item) => <span key={item.month}>{item.month}</span>)}</div>
      {activeItem && <div className="finance-tooltip" role="status"><b>{activeItem.month}</b><span>{formatMoney(activeItem.value)}</span></div>}
    </div>
  );
}

function mount() {
  const financeRoot = document.getElementById('finance-chart-root');
  const footerRoot = document.getElementById('footer-root');

  if (financeRoot) createRoot(financeRoot).render(<FinanceChart />);
  if (footerRoot) createRoot(footerRoot).render(<FooterSection />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount, { once: true });
} else {
  mount();
}
