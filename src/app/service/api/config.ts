const _url: string = 'https://gorest.co.in/public/v2';
export const AUTH_TOKEN =
  'd5900ec4470fd6cf88bcdeb01a766904fbe19b4124d8d1bf96da49b4056c52e2';

export const ConfigAPI = {
  // user
  USER_URL: `${_url}/users`,
  USER_ACTION_URL: (id_user: string) => `${_url}/users/${id_user}`,

  // post in user
  POSTS_ACTION_URL: (id_user: string) => `${_url}/users/${id_user}/posts`,
};
