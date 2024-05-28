export const autocompleteStyles = {
  clearButtonProps: {
    className: 'w-3 h-3 text-xs p-0 m-0'
  },
  listBoxProps: {
    hideSelectedIcon: false,
    itemClasses: {
      base: [
        'rounded-medium',
        'text-default-500',
        'transition-opacity',
        'data-[hover=true]:text-foreground',
        'dark:data-[hover=true]:bg-default-50',
        'data-[pressed=true]:opacity-70',
        'data-[hover=true]:bg-default-200',
        'data-[selectable=true]:focus:bg-default-100',
        'data-[focus-visible=true]:ring-default-500'
      ]
    }
  },
  popoverProps: {
    offset: 10,
    classNames: {
      base: 'rounded-large w-72',
      content: 'p-1 border-small border-default-100 bg-background w-72'
    }
  },
  inputPhoneNumber: {
    label:
      'text-black/50 md:text-sm text-xs font-semibold md:font-bold dark:text-white/90 mb-8',
    input: [
      'bg-transparent',
      'text-black/90 dark:text-white/90',
      'placeholder:text-default-700/50 dark:placeholder:text-white/60'
    ],
    innerWrapper: 'bg-transparent',
    inputWrapper: [
      'border border-[#E2E2E2] border-l-none rounded-l-none',
      '!cursor-text',
      'hover:bg-default',
      'focus-within:!bg-default-200/50'
      // 'mt-5'
    ]
  }
}
