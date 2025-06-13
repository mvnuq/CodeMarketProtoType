import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './AppHeader.css'

const AppHeader: React.FC = () => {
  return (
    <div className="top-nav">
      <img src="/assets/logo-codemarket.png" alt="CodeMarket" className="logo" />
      <Input
        className="search-bar"
        placeholder="Buscar software..."
        prefix={<SearchOutlined />}
      />
    </div>
  )
}

export default AppHeader
