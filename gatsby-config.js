module.exports = {
  siteMetadata: {
    title: 'The Wonder Years References',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `987wfjcr4vnp`,
        accessToken: `d07dc6276ca1a29bded9a1f0597563f9e6e7f81a3942b8a68cfd2f1f66839475`,
      },
    },
  ],
}
