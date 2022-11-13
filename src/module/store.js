/**
 * 상태관리 모듈
 */
import { eventDispatch } from '@src/module/event';

/**
 * 전역 스토어(상태)
 */
const store = {
    loading: false,
    index: 0,
    length: 0,
    images: null,
};

/**
 * 상태 업데이트 타입
 */
export const ACTION_TYPE = {
    // 데이터 로딩
    SET_LOADING: 'SET_LOADING',
    // image 데이터
    SET_DATA_IMAGES: 'SET_DATA_IMAGES', 
    GET_DATA_IMAGES: 'GET_DATA_IMAGES', 
    // slide index 데이터
    SET_DATA_INDEX: 'SET_DATA_INDEX', 
    GET_DATA_INDEX: 'GET_DATA_INDEX', 
    // slide length 데이터
    SET_DATA_LENGTH: 'SET_DATA_LENGTH',
    GET_DATA_LENGTH: 'GET_DATA_LENGTH',
    // slide next / prev
    SET_SLIDE_PREV: 'SET_SLIDE_PREV',
    SET_SLIDE_NEXT: 'SET_SLIDE_NEXT',
};

/**
 * 전역 스토어 업데이트
 */
export const state = (type, data = null) => {
    console.log('state', store, type, data);
    switch(type) {
        case ACTION_TYPE.SET_LOADING:
            store.loading = Boolean(data);
            return eventDispatch(ACTION_TYPE.SET_LOADING, store.loading);

        case ACTION_TYPE.SET_DATA_IMAGES:
            store.images = Array.isArray(data) ? data : [];
            store.index = 0;
            store.length = store.images?.length;
            return eventDispatch(ACTION_TYPE.SET_DATA_IMAGES, store.images);
        case ACTION_TYPE.GET_DATA_IMAGES:
            return store.images;

        case ACTION_TYPE.SET_DATA_INDEX:
            store.index = Number(data | 0);
            return eventDispatch(ACTION_TYPE.SET_DATA_INDEX, store.index);
        case ACTION_TYPE.GET_DATA_INDEX:
            return store.index;

        case ACTION_TYPE.SET_DATA_LENGTH:
            store.length = data;
            return eventDispatch(ACTION_TYPE.SET_DATA_LENGTH, store.length);
        case ACTION_TYPE.GET_DATA_LENGTH:
            return store.length;

        case ACTION_TYPE.SET_SLIDE_PREV:
            if(0 < store.length && 0 < store.index) {
                store.index = store.index - 1;
            }
            return eventDispatch(ACTION_TYPE.SET_DATA_INDEX, store.index);
        case ACTION_TYPE.SET_SLIDE_NEXT:
            if(0 < store.length && store.index < (store.length - 1)) {
                store.index = store.index + 1;
            }
            return eventDispatch(ACTION_TYPE.SET_DATA_INDEX, store.index);

        default:
            return store;
    }   
};
