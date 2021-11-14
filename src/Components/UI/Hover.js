import React, { useState } from "react";

var normal = {
    position: 'absolute',
    top: 1,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0
}

var hover = {
    position: 'absolute',
    top: 1,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 1
}

const Hover = (props) => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnterHandler = () => {
    setIsHover(true);
    console.log("enter");
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
    console.log("leave");
  };

  var inner = normal;
  if (isHover) {
    inner = hover;
  }

  return (
      <div
        style={inner}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {props.children}
      </div>
  );
};

export default Hover;
