import { defineStore, createPinia } from 'pinia';

type State = {
    keepAlive: string[];
};

const id = '@@common';
const initialState: State = {
    keepAlive: [],
};
export const useCommonStore = defineStore(id, {
    state: () => ({ ...initialState }),
    getters: {},
    actions: {
        setKeepAlive(val: string) {
            if (!this.keepAlive.includes(val)) this.keepAlive.push(val);
        },
        /**
         * 删除
         * @param {string} val 组件 name
         * @param {string} type all 删除所有 默认删除指定组件
         */
        removeKeepAlive(val: string, type = '') {
            if (type == 'all') {
                this.keepAlive = [];
            } else {
                if (this.keepAlive.includes(val)) {
                    this.keepAlive.splice(
                        this.keepAlive.findIndex((item) => item == val),
                        1,
                    );
                }
            }
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'keepAlive',
                storage: localStorage,
                paths: ['keepAlive'],
            },
        ],
    },
});
export function useCommonStoreWithOut() {
    return useCommonStore(createPinia());
}
