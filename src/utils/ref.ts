export const scrollToElement = (el: HTMLElement) => {
  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};
