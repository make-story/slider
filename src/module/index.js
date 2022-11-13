/**
 * UI 
 */
import { ACTION_TYPE, state } from '@src/module/store';
import { eventOn, eventOff } from '@src/module/event';
import { selectorLoading, selectorMessage, selectorSlider } from '@src/module/element';

// 엘리먼트
const $loading = selectorLoading();
const $message = selectorMessage();
const { $slide, $slideWrap, $buttonPrev, $buttonNext } = selectorSlider();

// 로딩 데이터 업데이트되었을 때
export const setRenderLoading = ($loading, $slide, is = false) => {
    if(is) {
        $loading.style.display = 'block';
        $slide.style.display = 'none';
    }else {
        $loading.style.display = 'none';
        $slide.style.display = 'block';
    }
};
eventOn(ACTION_TYPE.SET_LOADING, ({ detail }) => {
    // 유효성 검사
    if(!$loading || !$slide) {
        return;
    }
    setRenderLoading($loading, $slide, detail);
});

// 이미지 데이터 업데이트되었을 때
export const setRenderSlideList = ($slideWrap = null, data = []) => {
    $slideWrap.innerHTML = ''; 
    const $fragment = document.createDocumentFragment(); // 임시 Node DOM 공간 활용
    data.forEach((value, index, list) => {
        const $div = document.createElement('div');
        $div.setAttribute('class', 'slide_item test');
        $div.setAttribute('data-index', index); // TODO: 해당 이미지 선택했을 때, 해당 원본 이미지 노출을 위한 data-index 설정
        $div.innerHTML = `<img src="//localhost:5000${value}?width=300" />`;
        $fragment.appendChild($div);
    });
    $slideWrap.appendChild($fragment);
};
eventOn(ACTION_TYPE.SET_DATA_IMAGES, ({ detail }) => {
    // 유효성 검사
    if(!$slideWrap || !Array.isArray(detail)) {
        return;
    }
    setRenderSlideList($slideWrap, detail);
});

// 슬라이드 index 번경되었을 때
export const setRenderSlideMove = ($slide = null, data = 0) => {
    const $slideItems = $slide.querySelectorAll(".slide_item");
    const slideWidth = $slide.clientWidth;
    const offset = slideWidth * data;
    $slideItems.forEach((value, index, list) => {
        value.setAttribute("style", `left: ${-offset}px`);
    });
};
eventOn(ACTION_TYPE.SET_DATA_INDEX, ({ detail }) => {
    // 유효성 검사
    if(!$slide) {
        return;
    }
    setRenderSlideMove($slide, detail);
});

// 이전 / 다음 슬라이드
const setSlideButtonListener = (event) => {
    const type = event?.target?.dataset?.type; // data-type 속성값
    // 상태변경
    if(type === 'prev') {
        state(ACTION_TYPE.SET_SLIDE_PREV);
    }else if(type === 'next') {
        state(ACTION_TYPE.SET_SLIDE_NEXT);
    }
};
try {
    $buttonPrev.removeEventListener("click", setSlideButtonListener);
    $buttonPrev.addEventListener("click", setSlideButtonListener);
    $buttonNext.removeEventListener("click", setSlideButtonListener);
    $buttonNext.addEventListener("click", setSlideButtonListener);
}catch(error) {
    console.log(error);
}

// 플리킹
(() => {
    let pointStart = 0;
    let pointEnd = 0;
    const setStartListener = (event) => {
        console.log('start', event);
        pointStart = event?.pageX || event?.touches[0]?.pageX || 0;
    };
    const setEndListener = (event) => {
        console.log('end', event);
        pointEnd = event?.pageX || event?.changedTouches[0]?.pageX || 0;
        // 상태변경
        if (pointStart < pointEnd) {
            state(ACTION_TYPE.SET_SLIDE_PREV);
        } else if (pointStart > pointEnd) {
            state(ACTION_TYPE.SET_SLIDE_NEXT);
        }
    };
    try {
        $slideWrap.removeEventListener("mousedown", setStartListener);
        $slideWrap.removeEventListener("mouseup", setEndListener);
        $slideWrap.removeEventListener("touchstart", setStartListener);
        $slideWrap.removeEventListener("touchend", setEndListener);
        $slideWrap.addEventListener("mousedown", setStartListener);
        $slideWrap.addEventListener("mouseup", setEndListener);
        $slideWrap.addEventListener("touchstart", setStartListener);
        $slideWrap.addEventListener("touchend", setEndListener);
    }catch(error) {
        console.log(error);
    }
})();