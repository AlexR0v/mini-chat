import React, { useState } from 'react'
import { WebSocketLink } from '@apollo/client/link/ws'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
  useSubscription
} from '@apollo/client'
import { Button, Col, Container, FormInput, Row } from 'shards-react'

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
})

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

const GET_MESSAGES = gql`
    subscription {
        messages{
            id
            content
            user
        }
    }
`

const POST_MESSAGE = gql`
    mutation ($user: String!, $content: String!){
        postMessage(user: $user, content: $content)
    }
`

const Message = ({ user }) => {
  const { data } = useSubscription(GET_MESSAGES)
  if (!data) {
    return null
  }
  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          key={id}
          style={{
            display: 'flex',
            justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
            paddingBottom: '1em'
          }}
        >
          {user !== messageUser && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: '0.5em',
                border: '2px solid #e5e6ea',
                borderRadius: 25,
                textAlign: 'center',
                fontSize: '1.5rem',
                paddingTop: 3,
                backgroundColor: 'white'
              }}
            >
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === messageUser ? '#58bf56' : '#1c73f6',
              color: 'white',
              padding: '1em',
              borderRadius: '1em',
              maxWidth: '60%'
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  )
}

const Chat = () => {
  const [state, setState] = useState({
    user: 'Алексей',
    content: ''
  })

  const [postMessage] = useMutation(POST_MESSAGE)

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state
      })
    }
    setState({
      ...state,
      content: ''
    })
  }

  return (
    <>
      <Container
        style={{
          height: 500,
          overflowY: 'scroll',
          border: '1px solid #e5e6ea',
          backgroundColor: '#c4c4c6',
          padding: 30
        }}
      >
        <Message user={state.user} />
      </Container>
      <Container>
        <Row
          style={{ paddingTop: 30}}
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
    </>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)