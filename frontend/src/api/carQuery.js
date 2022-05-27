export const getCarBySlug = (slug) => {
    let query = `*[slug.current == "${slug}"]{
        _id,
        user,
        name,
        "brand": brand[]->name,
        fuelType,
        fuelConsumption,
        transmition,
        price,
        seats,
        "category": category[]->category,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        availability,
        description
      }`

    return query
}

export const getAllCars = (start, end) => {
  let query = `*[_type == "car"][${start}..${end}]{
    name,
    slug,
    "brand": brand[]->name,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    description,
    availability
  }`

  return query
}

export const getAllCarsByFilter = (filter, start, end) => {
  let query = `*["${filter}" in brand[]->name][${start}..${end}]{
    name,
    slug,
    "brand": brand[]->name,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    description,
    availability
  }`

  return query
}

export const getAllCarsWithoutPagination = () => {
  let query = `*[_type == "car"]`;
  return query;
}

export const getAllCarsByFilterWOPagination = (filter) => {
  let query = `*["${filter}" in brand[]->name]`
  return query;
}

export const getAllBrandNames = () => {
  let query = `*[_type == "brand"]{name}`;
  return query;
}

export const getAllByUserEmail = (email) => {
  let query = `*[user == '${email}']{
    name,
    _id,
    user,
    slug,
    "brand": brand[]->name,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    description
  }`
  
  return query;
}