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
  DefaultAdmin = 15
}

export {
  UserType,
  Sex,
  AccountType,
  LanguagePreference,
  AddressType,
  AppParametersType
}
