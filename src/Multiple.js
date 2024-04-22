let activeList = ref([]);
function init(body) {
  let start = {
    X: 0,
    Y: 0,
  };

  let isMultiple = false;
  let dom = null;
  let list = null;

  function initDom({ X, Y }) {
    dom = document.createElement("div");
    dom.classList.add("cxf_multiple");
    dom.style.position = "fixed";
    dom.style.top = Y + "px";
    dom.style.left = X + "px";
    dom.style.backgroundColor = "#3e7fb936";
    dom.style.border = "1px solid #1e446557";
    document.body.appendChild(dom);
  }
  function updateDragBox({ X, Y }) {
    const node = getBoxStyle({ X, Y });
    dom.style.height = node.height + "px";
    dom.style.width = node.width + "px";
    dom.style.left = node.left + "px";
    dom.style.top = node.top + "px";
  }

  function getBoxStyle({ X, Y }) {
    let left = start.X;
    let top = start.Y;
    if (X < 0) {
      left = start.X + X;
    }
    if (Y < 0) {
      top = start.Y + Y;
    }
    return {
      left,
      top,
      height: Math.abs(Y),
      width: Math.abs(X),
    };
  }

  function mousedown(event) {
    isMultiple = false;
    if (event.button == 2) {
      isMultiple = true;
      const { pageX: X, pageY: Y } = event;
      start = {
        X,
        Y,
      };
      initDom(start);
    }

    if (
      event.button == 0 &&
      event.toElement?.classList.value
        ?.split(" ")
        ?.every((v) => v != activeClassName)
    ) {
      let isDefault = false;
      for (var value of event.target?.classList.values()) {
        if (value == defaultClassName) {
          isDefault = true;
          break;
        }
      }
      if (!isDefault) {
        activeList.value = [];
      }

      event.target?.classList;
      if (list) {
        for (let i of list) {
          let is = false;
          for (var value of i.classList.values()) {
            if (value == activeClassName) {
              is = true;
              break;
            }
          }
          if (is) {
            i.classList.remove("cxf_multiple_active");
          }
        }
      }
    }
  }

  function mousemove(event) {
    if (isMultiple) {
      const { pageX: X, pageY: Y } = event;
      updateDragBox({
        X: X - start.X,
        Y: Y - start.Y,
      });

      // list = document.getElementById("app").children;
      list = document.getElementsByClassName(activeClassName);

      for (let i of list) {
        let is = false;
        for (let value of i.classList.values()) {
          if (value == activeClassName) {
            is = true;
          }
        }
        if (is) {
          const node = getBoxStyle({
            X: X - start.X,
            Y: Y - start.Y,
          });
          if (
            isRectangleOverlap(
              getRectData(node, false),
              getRectData(i.getBoundingClientRect(), false)
            )
          ) {
            activeList.value.push(i.getAttribute("data-id"));
            activeList.value = Array.from(new Set(activeList.value));
            i.classList.add("cxf_multiple_active");
          } else {
            activeList.value.filter((v) => v == i.getAttribute("data-id"));
            i.classList.remove("cxf_multiple_active");
          }
        }
      }
    }
  }

  function mouseup() {
    isMultiple = false;
    dom?.remove();
  }

  function getRectData(rect, isDom = true) {
    const TOP =
      parseInt(isDom ? window.getComputedStyle(rect).top : rect.top) || 0;
    const LEFT =
      parseInt(isDom ? window.getComputedStyle(rect).left : rect.left) || 0;
    const HEIGHT =
      parseInt(isDom ? window.getComputedStyle(rect).height : rect.height) || 0;
    const WIDTH =
      parseInt(isDom ? window.getComputedStyle(rect).width : rect.width) || 0;

    return [LEFT, TOP, LEFT + WIDTH, TOP + HEIGHT];
  }

  var isRectangleOverlap = function (rec1, rec2) {
    return !(
      rec1[2] <= rec2[0] ||
      rec1[0] >= rec2[2] ||
      rec1[3] <= rec2[1] ||
      rec1[1] >= rec2[3]
    );
  };

  body.removeEventListener("mousedown", mousedown);
  body.removeEventListener("mousemove", mousemove);
  body.removeEventListener("mouseup", mouseup);

  body.addEventListener("mousedown", mousedown);
  body.addEventListener("mousemove", mousemove);
  body.addEventListener("mouseup", mouseup);
}

let activeClassName = "";
let defaultClassName = "";
export function cxf_Multiple(data, defaultData, array) {
  activeClassName = data;
  defaultClassName = defaultData;
  init(document);
  activeList = array;
}
