import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  // eslint-disable-next-line no-console
  console.log("Page transition start");
  document.querySelector("body")?.classList.add("page-is-transitioning");
};
