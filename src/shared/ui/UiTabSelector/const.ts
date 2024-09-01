import type { InjectionKey, Ref } from 'vue';

export type TabId = string | number;

export const SET_TAB_SYMBOL = Symbol('setTab') as InjectionKey<(tabId: TabId) => void>;
export const SELECTED_TAB_SYMBOL = Symbol('selectedTab') as InjectionKey<Ref<TabId>>;
export const ADD_TAB_SYMBOL = Symbol('addTab') as InjectionKey<(tabId: TabId) => void>;
