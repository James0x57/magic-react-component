import styled from 'styled-components'
import css from '@styled-system/css'

const magicHandler = defaultStylesObj => reactProps => {
  const { magic, theme } = reactProps
  theme.magicProps = reactProps // gross hack to let styles assigned to a function react to current props
  theme.magicScale = (scalar, value) => (css({ [scalar]: value })(reactProps)[scalar])
  const resultDefaults = defaultStylesObj ? css(defaultStylesObj)(reactProps) : {}
  const resultMagicProp = css(Array.isArray(magic) ? Object.assign({}, ...magic) : magic)(reactProps)
  delete theme.magicProps
  delete theme.magicScale
  return Object.assign(resultDefaults, resultMagicProp)
}

const magicComponent = (tag, defaultCSS, defaultStylesObj) => {
  tag = tag || "div"
  const fn = typeof tag === "string" ? styled[tag] : styled(tag)
  return fn([defaultCSS || ""], magicHandler(defaultStylesObj))
}

export default magicComponent
