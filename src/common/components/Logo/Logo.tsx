import React, { FC } from 'react'

import s from './Logo.module.scss'

type LogoType = {
  img: string
}

const Logo: FC<LogoType> = ({ img }) => {
  return (
    <div className={s.logoContainer}>
      <a
        className={s.logoLink}
        href={'https://it-incubator.io/'}
        target={'_blank'}
        rel="noreferrer"
      >
        <img src={img} alt="logo it-incubator" />
      </a>
    </div>
  )
}

export default Logo
