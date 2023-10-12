import React from 'react';

const Container = (props) => {
  return (
    <div
      className={`container lg:px-3 xl:px-3 2xl:px-3 px-4 mx-auto ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
