import React, { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from '@floating-ui/react'

export default function Popover() {
  const [open, setOpen] = useState(false)

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom',
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const headingId = useId()

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="bg-indigo-900 text-white active:bg-blueGray-600 text-xs font-bold px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 mb-3 ease-linear transition-all duration-150"
        type="button"
      >
        <i className="fas fa-user mr-2"></i>
        User Name
      </button>

      {/* <button
        className="bg-indigo-900 text-white active:bg-blueGray-600 text-xs font-bold px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 mb-3 ease-linear transition-all duration-150"
        type="button"
        >
        <i className="fas fa-user mr-2"></i> 
        Hi, {user?.name}
    </button> */}
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="bg-white text-base z-50 float-left py-2 list-none text-left shadow-lg min-w-48"
            ref={refs.setFloating}
            style={{
              position: 'strategy',
              top: y ?? 0,
              left: x ?? 0,
            }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <a
              href="#pablo"
              className={
                'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
              }
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }}
            >
              Logout
            </a>
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}
