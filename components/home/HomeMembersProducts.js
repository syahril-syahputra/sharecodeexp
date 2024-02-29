import React from 'react'

export default function HomeMembersProducts(props) {
  return (
    <div className="flex justify-center items-center space-x-8 container text-white text-center">
      <div>
        <span className="text-5xl">{props.member}</span>
        <div className="text-xl">Members</div>
      </div>
      <div>
        <span className="text-5xl">{props.product}</span>
        <div className="text-xl">Products</div>
      </div>
    </div>
  )
}
