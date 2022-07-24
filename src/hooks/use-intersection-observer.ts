import { RefObject, useEffect, useState } from "react";

const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = "0%" }: IntersectionObserverInit
): boolean | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const node = elementRef?.current;

    if (!window.IntersectionObserver || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => setEntry(entry),
      observerParams
    );

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, JSON.stringify(threshold), root, rootMargin]);

  return entry?.isIntersecting;
};

export default useIntersectionObserver;
