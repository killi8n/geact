// original code by velopert (velog)
export const getScrollTop = () => {
    if (!document.body) return 0
    const scrollTop = document.documentElement
        ? document.documentElement.scrollTop
        : document.body.scrollTop
    return scrollTop
}

// original code by velopert (velog)
export const getScrollBottom = () => {
    if (!document.body) return 0
    const { scrollHeight } = document.body
    const { innerHeight } = window
    const scrollTop = getScrollTop()
    return scrollHeight - innerHeight - scrollTop
}
