// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

const Icon = (props) => {
  const { icon } = props
  return <li>{icon}</li>
}

Icon.propTypes = {
  icon: PropTypes.element.isRequired,
}

export default Icon
