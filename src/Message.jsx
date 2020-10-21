import { gql, useSubscription } from '@apollo/client'
import React from 'react'
import { GET_MESSAGES } from './actions'

export const Message = ({ user }) => {
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
