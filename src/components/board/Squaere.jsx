import React from 'react'

const Squaere = ({children, black}) => {
    const classBW = black ? 'squaere_black' : 'squaere_white'

  return <div className={classBW}>{children}</div>;
}

export default Squaere