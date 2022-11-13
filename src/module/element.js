/**
 * element 셀렉터
 * 
 * DOM 은 유동적으로 변경(추가/제거 등)이 발생하므로, 함수 실행시점 DOM 재검색 
 */
export const selectorLoading = () => document.querySelector("#loading");
export const selectorMessage = () => document.querySelector("#message");
export const selectorOriginalImage = () => document.querySelector("#originalImage");
export const selectorSlider = () => {
    const $slide = document.querySelector("#slide");
    const $slideWrap = ($slide || document).querySelector(".slide_wrap");
    const $buttonPrev = ($slide || document).querySelector(".slide_prev_button");
    const $buttonNext = ($slide || document).querySelector(".slide_next_button");
    return { $slide, $slideWrap, $buttonPrev, $buttonNext, };
};
