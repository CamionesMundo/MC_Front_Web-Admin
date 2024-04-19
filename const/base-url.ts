const BASE_ADMIN_API = '/admin'
const BASE_ADMIN_URL = `${BASE_ADMIN_API}/collaborators`
const BASE_CLIENT_URL = `${BASE_ADMIN_API}/clients`
const BASE_ADDRESS_URL = `${BASE_ADMIN_API}/address`
const BASE_MC_AUTH_URL = '/auth/admin'
const BASE_MC_CORE_URL = '/core'
const BASE_MC_ADMIN_URL = `${BASE_MC_AUTH_URL}/users`
const BASE_MC_CLIENT_URL = `${BASE_MC_AUTH_URL}/users/app/movil`
const BASE_MC_ADDRESS = `${BASE_MC_CORE_URL}/address/admin`
export {
  BASE_ADMIN_URL,
  BASE_MC_ADMIN_URL,
  BASE_MC_AUTH_URL,
  BASE_CLIENT_URL,
  BASE_MC_CLIENT_URL,
  BASE_MC_CORE_URL,
  BASE_MC_ADDRESS,
  BASE_ADDRESS_URL
}
