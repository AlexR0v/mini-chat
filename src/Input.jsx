import { Button, Col, Container, FormInput, Row } from 'shards-react'
import React from 'react'

export const Input = ({ onSend, setState, state }) => {
  return (
    <Container>
      <Row
        style={{ paddingTop: 30 }}
      >
        <Col
          xs={2}
          style={{ padding: 0 }}
        >
          <FormInput
            label={'Пользователь'}
            value={state.user}
            onChange={(e) => setState({
              ...state,
              user: e.target.value
            })}
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label={'Сообщение'}
            value={state.content}
            onChange={(e) => setState({
              ...state,
              content: e.target.value
            })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSend()
              }
            }}
          />
        </Col>
        <Col
          xs={1}
        >
          <Button
            outline
            theme='success'
            onClick={() => onSend()}
          >
            Отправить
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
