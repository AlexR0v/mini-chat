import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Container } from 'shards-react'
import { Message } from './Message'
import { POST_MESSAGE } from './actions'
import { Input } from './Input'

export const Chat = () => {

  const [postMessage] = useMutation(POST_MESSAGE)

  const [state, setState] = useState({
    user: 'Алексей',
    content: ''
  })

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
      <Input
        onSend={onSend}
        setState={setState}
        state={state}
      />
    </>
  )
}
