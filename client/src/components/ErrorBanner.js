import React from 'react'

const ErrorBanner = ({ message }) => {
  let errorMessage = message || '에러입니다.';
  return (
    <div className="errorBanner">
      {errorMessage}
    </div>
  )
}

export default ErrorBanner