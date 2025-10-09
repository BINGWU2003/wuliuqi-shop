// these APIs are auto-imported from @vueuse/core
// 关闭自动跟随系统深色模式，默认使用浅色模式
export const isDark = useDark({
  initialValue: 'light',
})
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
