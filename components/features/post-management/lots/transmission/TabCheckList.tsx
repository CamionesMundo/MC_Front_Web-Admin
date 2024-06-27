import { getCheckListStatus } from '@/lib/utils/utils'
import { type PublicationResponse } from '@/types/api/response/publication'
import { Divider, Spacer } from '@nextui-org/react'
import React from 'react'

type TabCheckListProps = {
  publication: PublicationResponse | undefined
}
type ItemInfoProps = {
  title: string
  value: string
}

const ItemInfo = ({ title, value }: ItemInfoProps) => {
  return (
    <div className='flex flex-row justify-between w-full mb-2 gap-3 items-center'>
      <span className='text-sm ml-3'>{title}</span>
      <span className='text-sm'>{value}</span>
    </div>
  )
}
const TabCheckList = ({ publication }: TabCheckListProps) => {
  const ENGINE_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.engine_status
  )

  const TRANSMISSION_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.transmission_status
  )

  const HYDRAULIC_SYSTEM_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.hydraulic_system_status
  )

  const ALTERNATOR_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.alternator_status
  )

  const PTO_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.pto_status
  )

  const BATTERY_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.battery_status
  )

  const STARTER_MOTOR_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.starter_motor_status
  )

  const DIFFERENTIAL_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.battery_status
  )

  const BRAKE_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.brake_status
  )

  const PARKING_BRAKE_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.parking_brake_status
  )

  const RETARDER_BRAKE_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.retarder_brake_status
  )

  const STEERING_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.steering_status
  )

  const LIGHT_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.lights_status
  )

  const ELECTRICAL_WIRING_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.electrical_wiring_status
  )

  const WINDSHIELD_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.steering_status
  )

  const SIDE_GLASS_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.side_glass_status
  )
  const REARVIEW_MIRROR_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.rearview_mirror_status
  )
  const CABIN_DOOR_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.cabin_door_status
  )

  const CHASSIS_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.chassis_status
  )
  const SUSPENSION_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.suspension_status
  )

  const GENERAL_ELECTRIC_SYSTEM_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.general_electric_system_status
  )

  const DASHBOARD_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.dashboard_status
  )

  const RADIO_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.radio_status
  )

  const TACHOGRAPH_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.tachograph_status
  )

  const SEAT_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.seat_status
  )

  const AIR_CONDITIONING_STATUS = getCheckListStatus(
    publication?.vehicle.check_list?.air_conditioning_status
  )
  return (
    <>
      <div className='flex flex-col mb-3 dark:text-white'>
        <h1 className='font-semibold text-blackText dark:text-white'>
          {'Check List del Producto'}
        </h1>
        <Divider />
        <Spacer />
        <div className='grid md:grid-cols-2 gap-x-10'>
          <ItemInfo title='Estado del motor' value={ENGINE_STATUS} />
          <ItemInfo title='Estado de transmisión' value={TRANSMISSION_STATUS} />
          <ItemInfo
            title='Estado del sistema hidráulico'
            value={HYDRAULIC_SYSTEM_STATUS}
          />
          <ItemInfo title='Estado de la toma de fuerza ' value={PTO_STATUS} />
          <ItemInfo title='Estado del alternador ' value={ALTERNATOR_STATUS} />
          <ItemInfo title='Estado de la batería  ' value={BATTERY_STATUS} />
          <ItemInfo
            title='Estado del motor de arranque '
            value={STARTER_MOTOR_STATUS}
          />
          <ItemInfo title='Estatus diferencial ' value={DIFFERENTIAL_STATUS} />
          <ItemInfo title='Estado del freno  ' value={BRAKE_STATUS} />
          <ItemInfo
            title='Estado del freno de mano '
            value={PARKING_BRAKE_STATUS}
          />
          <ItemInfo
            title='Estado del freno retardador'
            value={RETARDER_BRAKE_STATUS}
          />
          <ItemInfo title='Estado de la dirección' value={STEERING_STATUS} />
          <ItemInfo title='Estado de las luces ' value={LIGHT_STATUS} />
          <ItemInfo
            title='Estado del cableado eléctrico'
            value={ELECTRICAL_WIRING_STATUS}
          />
          <ItemInfo title='Estado del parabrisas' value={WINDSHIELD_STATUS} />
          <ItemInfo
            title='Estado del cristal lateral '
            value={SIDE_GLASS_STATUS}
          />
          <ItemInfo
            title='Estado del espejo retrovisor '
            value={REARVIEW_MIRROR_STATUS}
          />
          <ItemInfo
            title='Estado de la puerta de la cabina'
            value={CABIN_DOOR_STATUS}
          />
          <ItemInfo title='Estado del chasis' value={CHASSIS_STATUS} />
          <ItemInfo title='Estado de suspensión ' value={SUSPENSION_STATUS} />
          <ItemInfo
            title='Estado general del sistema eléctrico'
            value={GENERAL_ELECTRIC_SYSTEM_STATUS}
          />
          <ItemInfo title='Estado del panel' value={DASHBOARD_STATUS} />
          <ItemInfo title='Estado de la radio' value={RADIO_STATUS} />
          <ItemInfo title='Estado del tacógrafo' value={TACHOGRAPH_STATUS} />
          <ItemInfo title='Estado del asiento' value={SEAT_STATUS} />
          <ItemInfo
            title='Estado del aire acondicionado'
            value={AIR_CONDITIONING_STATUS}
          />
        </div>
      </div>
    </>
  )
}

export default TabCheckList
