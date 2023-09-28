// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const { name, value, placeholder, handleInput, type, step } = props
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={handleInput}
      placeholder={placeholder}
      step={step}
      required
    />
  )
}

Input.defaultProps = {
  step: '', // Add a default value for `step` prop
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  step: PropTypes.string,
}

export default Input
