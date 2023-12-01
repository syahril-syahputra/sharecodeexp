import React from 'react'

export function Tooltip({children, tooltipText}) {
  const tooltipRef = React.useRef(null)
  const container = React.useRef(null)

  return (
    <div
      ref={container}
      onMouseEnter={({clientY}) => {
        if (!tooltipRef.current || !container.current) return;
        const {left} = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientY - left + 'px'
      }}
      className='group relative inline-block'
    >
      {children}
      {tooltipText ? (
        <div ref={tooltipRef} id="tooltip-default" role="tooltip" className="absolute z-10 invisible group-hover:visible inline-block px-3 py-2 text-sm group-hover:opacity-100  font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          {tooltipText}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      ) : null}
    </div>
  )

}
