/**
 * UI 모듈
 */
import { fetchImageList } from '../api/index';
import { ACTION_TYPE, state } from './store';
import { eventOn, eventOff } from './event';

// 엘리먼트 셀렉트
const $loading = document.querySelector("#loading");
const $message = document.querySelector("#message");
const $slide = document.querySelector("#slide");
const $slideWrap = ($slide || document).querySelector(".slide_wrap");
const $buttonPrev = ($slide || document).querySelector(".slide_prev_button");
const $buttonNext = ($slide || document).querySelector(".slide_next_button");

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
    if(!$slide) {
        return;
    }
    setRenderSlideMove($slide, detail);
});

// 이미지 데이터 로드
(async () => {
    state(ACTION_TYPE.SET_LOADING, true);
    // 데이터 호출
    try {
        const response = await fetchImageList();
        const { images = [] } = response || {};
        state(ACTION_TYPE.SET_DATA_IMAGES, images);
        state(ACTION_TYPE.SET_LOADING, false);
    }catch (error) {
        console.log(error);
        state(ACTION_TYPE.SET_DATA_IMAGES, []);
        state(ACTION_TYPE.SET_LOADING, false);
        $slide.style.display = 'none';
        $message.innerHTML = '데이터 로드에 실패했습니다. 자주 발생할 경우 고객센터 문의 부탁드립니다.';
    }
})();

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