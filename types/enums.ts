enum UserType {
  Buyer = 1,
  Seller = 2,
  NaturalPerson = 3,
  Business = 4,
  LegalRepresentative = 5
}

enum AddressType {
  LegalRepresentative = 9,
  Company = 10,
  Delivery = 11,
  Billing = 12
}

enum Sex {
  Hombre = 'Hombre',
  Mujer = 'Mujer'
}

enum AccountType {
  Facebook = 'Facebook',
  Google = 'Google',
  Email = 'Email'
}

enum LanguagePreference {
  English = 'en',
  Spanish = 'es'
}

enum AppParametersType {
  Warranty = 1,
  Mechanical = 2,
  WarrantyDeposit = 3,
  MaximumNumberPhotos = 4,
  MinimumNumberPhotos = 5,
  CommissionForSale = 6,
  PlanFree = 7,
  PlanMonthly = 8,
  PlanAnnual = 9,
  FreeMemberShipsForever = 10,
  PublicationFree = 11,
  CustomAgentDescription = 12,
  TimeOfMarginForPayment = 13,
  SupportContactNumber = 14,
  DefaultAdmin = 15,
  TimeBetweenBids = 16
}

enum ModulesType {
  UsersManagement = 'users_management',
  UsersManagementAdmins = 'users_management_admins',
  UsersManagementRoles = 'users_management_roles',
  UsersManagementClients = 'users_management_clients',
  PublicationsManagement = 'publications_management',
  PublicationsManagementProducts = 'publications_management_products',
  PublicationsManagementAuctions = 'publications_management_auctions',
  PublicationsManagementLots = 'publications_management_lots',
  CustomsAgents = 'customs_agents',
  AppConfig = 'app_config',
  CategoriesManagement = 'categories_management',
  CategoriesManagementCountries = 'categories_management_countries',
  CategoriesManagementCities = 'categories_management_cities',
  CategoriesManagementVehicleTypes = 'categories_management_vehicle_types',
  CategoriesManagementBrands = 'categories_management_brands',
  CategoriesManagementModels = 'categories_management_models',
  CategoriesManagementSubModels = 'categories_management_sub_models',
  ShippingManagement = 'shipping_management',
  ShippingManagementOrders = 'shipping_management_orders',
  ShippingManagementHistory = 'shipping_management_history',
  ShippingManagementNotifications = 'shipping_management_notifications',
  AccountConfiguration = 'account_configuration'
}

enum LotStatus {
  Active = 'active',
  InProgress = 'progress',
  Finished = 'finished'
}

enum PaymentType {
  CreditCard = 'Credit Card',
  BankDeposit = 'Deposito bancario'
}

export enum TypeAuctionStatus {
  Active = 'active',
  InProgress = 'in progress',
  Pending = 'pending',
  Awarded = 'awarded',
  NoBidder = 'no bidder'
}

enum CheckListStatus {
  NoApplicable = 'no_applicable',
  Good = 'good',
  Regular = 'regular',
  Bad = 'bad'
}

enum BidStatus {
  Winner = 'winner',
  Penalized = 'penalized'
}

enum LotTransmissionStatus {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export {
  UserType,
  Sex,
  AccountType,
  LanguagePreference,
  AddressType,
  AppParametersType,
  ModulesType,
  LotStatus,
  PaymentType,
  CheckListStatus,
  BidStatus,
  LotTransmissionStatus
}
