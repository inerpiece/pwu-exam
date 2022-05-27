export const getAllTestimony = () => {
  let query = `*[_type == "testimonial"]{
    name,
    body,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    rating
  }`

  return query;
}