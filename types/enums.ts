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

export { UserType, Sex, AccountType, LanguagePreference, AddressType }
