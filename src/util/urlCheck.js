async function chekUrl(url) {
  return fetch(url).then((res) => (res.status === '200'));
}
export default chekUrl;
