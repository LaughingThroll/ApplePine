

function loadingPage(node, time) {

  let percent = Math.ceil(100 / (Math.ceil(time / 300)))

  let widthPercent = 0

  while (100 > widthPercent) {
    widthPercent += percent
  }

  node.css('width', widthPercent > 100 ? 100 + '%' : widthPercent + '%')

}

export {loadingPage}