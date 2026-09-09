"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            intersectionObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    // The App Router keeps this layout mounted across client-side navigations, so new
    // reveal targets can appear without this effect re-running. A MutationObserver picks
    // those up instead of scanning only once.
    //
    // [data-reveal] fades one element in. [data-reveal-group] marks a container whose
    // children are each observed separately, so a card animates when it reaches the
    // viewport rather than when the grid does — the CSS staggers them by column.
    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll("[data-reveal], [data-reveal-group] > *").forEach((el) => intersectionObserver.observe(el));
    };

    observeWithin(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal], [data-reveal-group] > *")) intersectionObserver.observe(node);
          observeWithin(node);
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
