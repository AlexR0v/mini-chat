import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'
import Chat from './Chat'
import { Container } from 'shards-react'

const App = () => (
  <Container
    style={{textAlign: 'center'}}
  >
    <h1>Чат!</h1>
    <Chat/>
  </Container>
)

render(
  <App />,
  document.getElementById('root')
)
