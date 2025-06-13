import { Form, Input, Button, Typography, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../auth/useAuth'

const { Title } = Typography

const Login = () => {
  const { login } = useAuth()

  const onFinish = async (values: any) => {
    try {
      await login(values.email, values.password)
      notification.success({ message: 'Logged in successfully' })
    } catch {
      notification.error({ message: 'Login failed', description: 'Invalid credentials' })
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <Title level={2}>Login to CodeMarket</Title>
      <Form name="login" onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: 'Enter your email' }]}>
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Enter your password' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Log In</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
