import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Snap Simulator</title>
      </Head>
      <DndProvider  backend={MultiBackend} options={HTML5toTouch}>  
        <Component {...pageProps} />
      </DndProvider>
    </>
    )
}
