import React, { useState } from "react";
import PropTypes from "prop-types";

function OptimizedList(props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  if (!props.items.length) return null

  let containerStyle = {
    // height: props.contentHeight,
    position: 'relative',
    height: `${props.items.length * props.itemHeight}px`,
    width: `${props.contentWidth}px`,
    ...props.style
  };

  const className =
    typeof props.className === "object"
      ? props.className.join(" ")
      : props.className;

  function whenScrolling(event) {
    const { scrollTop } = event.target;
    setScrollPosition(scrollTop);
  }


  return (
    <div style={containerStyle} onScroll={whenScrolling} className={className}>
      {props.items.map((item, index) => {
        let show = index * props.itemHeight;
        if (
          show >= scrollPosition /* - props.itemHeight * 3 */ &&
          show <= scrollPosition + props.itemHeight * 16
        ) {
          return props.render({
            index,
            item,
            style: {
              position: "absolute",
              height: props.itemHeight,
              transform: `translateY(${show}px)`
            },
            items: props.items
          });
        }
        return null;
      })}
    </div>
  );
}

OptimizedList.defaultProps = {
  itemHeight: 56,
  itemWidth: "100%",
  style: {},
  className: ""
};

OptimizedList.propTypes = {
  render: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ),
  itemHeight: PropTypes.number,
  itemWidth: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  items: PropTypes.array.isRequired,
  component: PropTypes.elementType
};

export default OptimizedList;
