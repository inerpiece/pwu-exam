import sanityClient from '@sanity/client';
const token = process.env.REACT_APP_SANITY_TOKEN;
const projectId = process.env.REACT_APP_PROJECT_ID;

export default sanityClient({
  projectId: projectId,
  dataset: "production",
  token: token
})