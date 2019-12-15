export function fetchData() {
  return fetch(`https://rickandmortyapi.com/api/character/`, {
    method: "GET"
  })
    .then(response => onAPIResponse(response))
    .catch(error => onAPIError(error));
}

function onAPIResponse(response) {
  if (response.ok && response.status >= 200 && response.status < 300) {
    return response.json();
  }
  if (response.status == 500) {
    return Promise.reject({ error: true, msg: "500 server error " });
  }
  if (response.status == 401) {
    return Promise.reject({ error: true, msg: "401 Authorize error " });
  }
  throw { error: true, msg: "unknown error" };
}

function onAPIError(error) {
  console.log(error);
  return Promise.reject(error);
}
