import '@src/index.css';
import { fetchImageList } from '@src/api/index';
import { ACTION_TYPE, state } from '@src/module/store';
import { selectorMessage, selectorSlider } from '@src/module/element';
import '@src/module/index';

// 엘리먼트
const $message = selectorMessage();
const { $slide, $slideWrap, $buttonPrev, $buttonNext } = selectorSlider();

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