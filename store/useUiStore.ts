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
  changeShowMenu: () => {
    set((state) => ({
      ...state,
      isShowMenu: !state.isShowMenu
    }))
  },
  changeShowMobileMenu: () => {
    set((state) => ({
      ...state,
      isShowMobileMenu: !state.isShowMobileMenu
    }))
  },
  reset: () => {
    set(initialState)
  },
  resetInMobile: () => {
    set(initialMobileState)
  }

}))
