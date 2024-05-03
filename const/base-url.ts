const BASE_ADMIN_API = '/admin'
const BASE_ADMIN_URL = `${BASE_ADMIN_API}/collaborators`
const BASE_CLIENT_URL = `${BASE_ADMIN_API}/clients`
const BASE_ADDRESS_URL = `${BASE_ADMIN_API}/address`
const BASE_PARAMETER_URL = `${BASE_ADMIN_API}/app-config`
const BASE_ROLES_URL = `${BASE_ADMIN_API}/roles`
const BASE_PERMISSIONS_URL = `${BASE_ADMIN_API}/permissions`
const BASE_AGENTS_URL = `${BASE_ADMIN_API}/custom-agents`
const BASE_MC_AUTH_URL = '/auth/admin'
const BASE_MC_CORE_URL = '/core'
const BASE_MC_ADMIN_URL = `${BASE_MC_AUTH_URL}/users`
const BASE_MC_CLIENT_URL = `${BASE_MC_AUTH_URL}/users/app/movil`
const BASE_MC_ADDRESS = `${BASE_MC_CORE_URL}/address/admin`
const BASE_MC_FILES = `${BASE_MC_CORE_URL}/files`
const BASE_MC_PARAMETERS_URL = `${BASE_MC_CORE_URL}/parameter/admin`
const BASE_MC_ROLES_URL = `${BASE_MC_AUTH_URL}/roles`
const BASE_MC_PERMISSIONS_URL = `${BASE_MC_AUTH_URL}/permissions`
const BASE_MC_PERMISSIONS_ROLE_URL = `${BASE_MC_AUTH_URL}/permissions-roles`
const BASE_MC_AGENTS_URL = `${BASE_MC_CORE_URL}/customs-agent`
export {
  BASE_ADMIN_API,
  BASE_ADMIN_URL,
  BASE_MC_ADMIN_URL,
  BASE_MC_AUTH_URL,
  BASE_CLIENT_URL,
  BASE_MC_CLIENT_URL,
  BASE_MC_CORE_URL,
  BASE_MC_ADDRESS,
  BASE_ADDRESS_URL,
  BASE_MC_FILES,
  BASE_MC_PARAMETERS_URL,
  BASE_PARAMETER_URL,
  BASE_MC_ROLES_URL,
  BASE_ROLES_URL,
  BASE_PERMISSIONS_URL,
  BASE_MC_PERMISSIONS_ROLE_URL,
  BASE_MC_AGENTS_URL,
  BASE_MC_PERMISSIONS_URL,
  BASE_AGENTS_URL
}
