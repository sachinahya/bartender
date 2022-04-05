import { RefCallback, useEffect, useState } from 'react';

export const useParallax = <T extends HTMLElement>(divideBy: number): RefCallback<T> => {
  const [element, setElement] = useState<T | null>(null);

  useEffect(() => {
    let isVisible: boolean;

    const observer = new IntersectionObserver((entries) => {
      if (entries.length === 1 && entries[0]) {
        isVisible = entries[0].isIntersecting;
      }
    });

    const setOffset = (offset: number) => {
      if (element) {
        element.style.transform = `translateY(-${offset}px)`;
      }
    };

    const handleScroll = () => {
      const offset = window.scrollY / divideBy;
      requestAnimationFrame(() => {
        // Need to check existence of element as it could have changed by the time this callback runs.
        if (isVisible) {
          setOffset(offset);
        }
      });
    };

    if (element) {
      setOffset(0);
      window.addEventListener('scroll', handleScroll);
      observer.observe(element);
    }

    return () => {
      if (element) {
        window.removeEventListener('scroll', handleScroll);
        observer.unobserve(element);
      }
    };
  }, [divideBy, element]);

  return setElement;
};
