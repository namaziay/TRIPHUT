export const set_islogged = () => {
  return {
      type: 'set_auth_true'
  }
}

export const unset_islogged = () => {
  return {
      type: 'set_auth_false'
  }
}
export const set_loggedUser = (data) => {
  return {
      type: 'set_loggedUser',
      payload: data
  }
}

export const unset_loggedUser = () => {
  return {
      type: 'unset_loggedUser',
  }
}

export const set_hPosts = (data) => {
  return {
      type: 'SET_HPOSTS',
      payload: data
  }
}

export const update_hPosts = (data) => {
  return {
      type: 'UPDATE_HPOSTS',
      payload: data
  }
}
export const update_data = () => {
  return {
      type: 'update_data',
  }
}