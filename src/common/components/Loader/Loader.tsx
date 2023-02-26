import React from 'react'

import { Spin } from 'antd'

import s from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Spin size={'large'} />
      </div>
    </div>
  )
}

export default Loader
