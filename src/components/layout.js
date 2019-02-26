import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import './normalize.css'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query = { graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    ` }
    render = {data => (
      <>
        <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Helmet>
        <div>{children}</div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
