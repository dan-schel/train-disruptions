import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  // eslint-disable-next-line no-console
  console.log("Page transition end");
  document.querySelector("body")?.classList.remove("page-is-transitioning");
};
