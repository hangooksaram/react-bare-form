export const scrollToElement = (el: HTMLElement) => {
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};
