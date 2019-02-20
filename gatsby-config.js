module.exports = {
  siteMetadata: {
    title: 'The Wonder Years References',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `xxv139uj2trn`,
        accessToken: `2e82e6c1af372169b71bb51f92f08a5e22ae2aad0da862f090a53211aeedf2ed`,
      },
    },
  ],
}
