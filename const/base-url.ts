const BASE_ADMIN_API = '/admin'
const BASE_ADMIN_URL = `${BASE_ADMIN_API}/collaborators`
const BASE_CLIENT_URL = `${BASE_ADMIN_API}/clients`
const BASE_ADDRESS_URL = `${BASE_ADMIN_API}/address`
const BASE_PARAMETER_URL = `${BASE_ADMIN_API}/app-config`
const BASE_ROLES_URL = `${BASE_ADMIN_API}/roles`
const BASE_PERMISSIONS_URL = `${BASE_ADMIN_API}/permissions`
const BASE_AGENTS_URL = `${BASE_ADMIN_API}/custom-agents`
const BASE_LOTS_URL = `${BASE_ADMIN_API}/lots`
const BASE_PUBLICATIONS_URL = `${BASE_ADMIN_API}/publications`
const BASE_AUCTIONS_URL = `${BASE_ADMIN_API}/auctions`
const BASE_LOTS_QUEUE_URL = `${BASE_ADMIN_API}/lot-queue`
const BASE_BID_CALCULATE = `${BASE_ADMIN_API}/bids-auction/calculate`
const BASE_PAYMENT_ORDERS_URL = `${BASE_ADMIN_API}/payment-orders`
const BASE_ORDERS_URL = `${BASE_ADMIN_API}/orders`
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
const BASE_MC_LOT_URL = `${BASE_MC_CORE_URL}/lot/admin`
const BASE_MC_AUCTIONS_URL = `${BASE_MC_CORE_URL}/publications/auctions`
const BASE_MC_LOT_QUEUE_URL = `${BASE_MC_CORE_URL}/lot-queue/admin`
const BASE_MC_PUBLICATION_URL = `${BASE_MC_CORE_URL}/publications`
const BASE_MC_BIDS_CALCULATE = `${BASE_MC_CORE_URL}/bids-auction/calculate-increment-for-amount`
const BASE_MC_LOT_TRANSMISSION_STATUS_URL = `${BASE_MC_CORE_URL}/lot/transmission/status`
const BASE_MC_PAYMENT_ORDERS_URL = `${BASE_MC_CORE_URL}/payment-orders/admin`
const BASE_MC_ORDER_URL = `${BASE_MC_CORE_URL}/orders`
const BASE_MC_ORDER_STATUS_URL = `${BASE_MC_CORE_URL}/order-status`
const BASE_MC_ORDER_HISTORY_STATUS_URL = `${BASE_MC_CORE_URL}/history-status`
const BASE_MC_CANCEL_ORDER_URL = `${BASE_MC_CORE_URL}/cancellation-requests/admin`

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
  BASE_AGENTS_URL,
  BASE_MC_LOT_URL,
  BASE_LOTS_URL,
  BASE_MC_AUCTIONS_URL,
  BASE_AUCTIONS_URL,
  BASE_MC_LOT_QUEUE_URL,
  BASE_PUBLICATIONS_URL,
  BASE_MC_PUBLICATION_URL,
  BASE_LOTS_QUEUE_URL,
  BASE_MC_BIDS_CALCULATE,
  BASE_BID_CALCULATE,
  BASE_MC_LOT_TRANSMISSION_STATUS_URL,
  BASE_MC_PAYMENT_ORDERS_URL,
  BASE_PAYMENT_ORDERS_URL,
  BASE_MC_ORDER_URL,
  BASE_ORDERS_URL,
  BASE_MC_ORDER_STATUS_URL,
  BASE_MC_ORDER_HISTORY_STATUS_URL,
  BASE_MC_CANCEL_ORDER_URL
}
