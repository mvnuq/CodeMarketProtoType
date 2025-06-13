import { Card, Typography, Row, Col } from 'antd'

const { Title } = Typography

type Props = {
  title: string
  items: { id: number; name: string; image: string }[]
}

const CategorySection = ({ title, items }: Props) => {
  return (
    <div style={{ marginBottom: 60 }}>
      <Title level={3} style={{ color: '#fff' }}>{title}</Title>
      <Row gutter={[16, 16]}>
        {items.map(item => (
          <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
            <Card
              hoverable
              cover={<img alt={item.name} src={item.image} style={{ height: 140, objectFit: 'cover' }} />}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                background: '#1e1b4b',
                color: '#fff',
                border: '1px solid #333',
              }}
            >
              <Card.Meta title={item.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CategorySection
