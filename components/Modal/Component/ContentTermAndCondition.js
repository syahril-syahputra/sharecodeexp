import React from 'react'

function ContentTermAndCondition({ content }) {
  return (
    <p className="my-2 leading-relaxed text-base ">
      <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
        {content}
      </span>
    </p>
  )
}

export default ContentTermAndCondition
