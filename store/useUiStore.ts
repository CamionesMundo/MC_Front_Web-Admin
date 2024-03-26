import { create } from 'zustand'

interface UIStoreState {
  isShowMenu: boolean
  isShowMobileMenu: boolean
}

interface UIStoreActions {
  changeShowMenu: () => void
  changeShowMobileMenu: () => void
  reset: () => void
  resetInMobile: () => void
}

const initialState: UIStoreState = {
  isShowMenu: true,
  isShowMobileMenu: false
}

const initialMobileState: UIStoreState = {
  isShowMenu: false,
  isShowMobileMenu: false

}

export const useUIStore = create<UIStoreState & UIStoreActions>((set) => ({
  ...initialState,
  // Action to change the value of 'isShowMenu'
  changeShowMenu: () => {
    set((state) => ({
      ...state,
      isShowMenu: !state.isShowMenu
    }))
  },
  // Action to change the value of 'isShowMobileMenu' in mobile view
  changeShowMobileMenu: () => {
    set((state) => ({
      ...state,
      isShowMobileMenu: !state.isShowMobileMenu
    }))
  },
  // Action to reset state UI in desktop view
  reset: () => {
    set(initialState)
  },
  // Action to reset state UI in mobile view
  resetInMobile: () => {
    set(initialMobileState)
  }

}))
