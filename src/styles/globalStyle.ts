import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  * {
  font-family: Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif;
  }
}

:root {
  line-height: 1.2;
  font-weight: 400;
  font-size: 62.5%;

  padding: 0;
  margin: 0;

  color-scheme: light dark;
  color: #fff;
  background-color: #181818;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
`
