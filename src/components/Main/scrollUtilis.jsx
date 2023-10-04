export const scrollLeft = (container) => {
  let scrollAmount
  if (window.innerWidth <= 768) {
    scrollAmount = container.offsetWidth // Adjust the scroll amount for mobile devices
  } else {
    scrollAmount = container.offsetWidth / 2 // Default scroll amount for desktop devices
  }
  container.scrollTo({
    left: container.scrollLeft - scrollAmount,
    behavior: 'smooth',
  })
}

export const scrollRight = (container) => {
  let scrollAmount
  if (window.innerWidth <= 768) {
    scrollAmount = container.offsetWidth // Adjust the scroll amount for mobile devices
  } else {
    scrollAmount = container.offsetWidth / 2 // Default scroll amount for desktop devices
  }
  container.scrollTo({
    left: container.scrollLeft + scrollAmount,
    behavior: 'smooth',
  })
}

export const handleScroll = (
  container,
  setIsFirstVisible,
  setIsLastVisible
) => {
  const firstItem = container.firstElementChild
  const containerRect1 = container.getBoundingClientRect()
  const firstItemRect = firstItem.getBoundingClientRect()
  setIsFirstVisible(firstItemRect.left >= containerRect1.left)
  const lastItem = container.lastElementChild
  const containerRect = container.getBoundingClientRect()
  const lastItemRect = lastItem.getBoundingClientRect()
  setIsLastVisible(lastItemRect.right <= containerRect.right)
}
