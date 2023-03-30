import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DndProvider  backend={MultiBackend} options={HTML5toTouch}>  
        <Component {...pageProps} />
      </DndProvider>
    </>
    )
}
