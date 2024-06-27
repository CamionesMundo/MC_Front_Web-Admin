import { type UserResponse } from '@/types/api'
import { type AuctionsDataType } from './../types/api/response/lots'
import { create } from 'zustand'

export interface LotFormDateState {
  transmissionDate: string
}
interface ActionnerStoreState {
  currentActionner: UserResponse | null | undefined
}

interface SelectedRowsStoreState {
  selectedRows: AuctionsDataType[]
}

interface LotActions {
  updateDate: (data: string) => void
  updateActionner: (actionner: UserResponse | undefined) => void
  updateSelectedRows: (selected: AuctionsDataType[]) => void
  reset: () => void
}

const initialDateState: LotFormDateState = {
  transmissionDate: ''
}

const initialSelectedRowsState: SelectedRowsStoreState = {
  selectedRows: []
}

const initialActionnerState: ActionnerStoreState = {
  currentActionner: undefined
}

export const useLotFormStore = create<
LotFormDateState & ActionnerStoreState & SelectedRowsStoreState & LotActions
>((set) => ({
  ...initialDateState,
  ...initialSelectedRowsState,
  ...initialActionnerState,
  updateDate: (data) => {
    set((state) => ({
      ...state,
      transmissionDate: data
    }))
  },
  updateActionner: (actionner) => {
    set((state) => ({
      ...state,
      currentActionner: actionner
    }))
  },
  updateSelectedRows: (selected) => {
    set((state) => ({
      ...state,
      selectedRows: selected
    }))
  },
  reset: () => {
    set({
      ...initialDateState,
      ...initialSelectedRowsState,
      ...initialActionnerState
    })
  }
}))
