import { getPermissionName } from '@/lib/utils/utils'
import usePermissionFormStore from '@/store/usePermissionsForm'
import { type PermissionResponse } from '@/types/api/response/roles'
import { ModulesType } from '@/types/enums'
import { Switch } from '@nextui-org/react'
import React, { useMemo } from 'react'

type SwitchPermissionProps = {
  item: PermissionResponse
}

const SwitchPermission = ({ item }: SwitchPermissionProps) => {
  const { setData, ...permissions } = usePermissionFormStore()
  const value = useMemo(() => {
    if (item !== undefined) {
      switch (item.name_permission) {
        case ModulesType.UsersManagement:
          return permissions.users_management
        case ModulesType.UsersManagementAdmins:
          return permissions.users_management_admins
        case ModulesType.UsersManagementRoles:
          return permissions.users_management_roles
        case ModulesType.UsersManagementClients:
          return permissions.users_management_clients
        case ModulesType.PublicationsManagement:
          return permissions.publications_management
        case ModulesType.PublicationsManagementProducts:
          return permissions.publications_management_products
        case ModulesType.PublicationsManagementAuctions:
          return permissions.publications_management_auctions
        case ModulesType.PublicationsManagementLots:
          return permissions.publications_management_lots
        case ModulesType.CustomsAgents:
          return permissions.customs_agents
        case ModulesType.AppConfig:
          return permissions.app_config
        case ModulesType.CategoriesManagement:
          return permissions.categories_management
        case ModulesType.CategoriesManagementCountries:
          return permissions.categories_management_countries
        case ModulesType.CategoriesManagementCities:
          return permissions.categories_management_cities
        case ModulesType.CategoriesManagementVehicleTypes:
          return permissions.categories_management_vehicle_types
        case ModulesType.CategoriesManagementBrands:
          return permissions.categories_management_brands
        case ModulesType.CategoriesManagementModels:
          return permissions.categories_management_models
        case ModulesType.CategoriesManagementSubModels:
          return permissions.categories_management_sub_models
        case ModulesType.ShippingManagement:
          return permissions.shipping_management
        case ModulesType.ShippingManagementOrders:
          return permissions.shipping_management_orders
        case ModulesType.ShippingManagementHistory:
          return permissions.shipping_management_history
        case ModulesType.ShippingManagementNotifications:
          return permissions.shipping_management_notifications
        case ModulesType.AccountConfiguration:
          return permissions.account_configuration
      }
    }
    return false
  }, [item, permissions])
  return (
    <div className='flex flex-row items-center gap-3 justify-between pr-2'>
      <div className='dark:text-white text-blackText text-xs font-semibold'>
        {getPermissionName(item.name_permission)}
      </div>

      <div className='flex items-center'>
        <Switch
          size='sm'
          color='primary'
          isSelected={value}
          onValueChange={() => {
            setData(item.name_permission, !value)
          }}
        />
      </div>
    </div>
  )
}

export default SwitchPermission
