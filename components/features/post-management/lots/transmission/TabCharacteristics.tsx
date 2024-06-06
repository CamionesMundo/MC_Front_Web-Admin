import { NO_REGISTER } from '@/const/other'
import { CheckCircle, XMarkCircle } from '@/icons'
import { type PublicationResponse } from '@/types/api/response/publication'
import { Divider, Spacer } from '@nextui-org/react'
import React from 'react'

type TabCharacteristicsProps = {
  publication: PublicationResponse | undefined
}

type ItemInfoProps = {
  title: string
  value: string
}

type ItemCheckValueProps = {
  title: string
  value: boolean
}

const ItemInfo = ({ title, value }: ItemInfoProps) => {
  return (
    <div className='flex flex-row justify-between w-full mb-2 gap-3 items-center'>
      <span className='text-sm ml-3'>{title}</span>
      <span className='text-sm'>{value}</span>
    </div>
  )
}

const ItemCheckValue = ({ title, value }: ItemCheckValueProps) => {
  return (
    <div className='flex flex-row justify-between w-full mb-2 items-center'>
      <span className='text-sm ml-3'>{title}</span>
      {value && <CheckCircle className='w-4 h-4 md:w-5 md:h-5 text-success' />}
      {!value && <XMarkCircle className='w-4 h-4 md:w-5 md:h-5 text-danger' />}
    </div>
  )
}

const TabCharacteristics = ({ publication }: TabCharacteristicsProps) => {
  const YEAR_VEHICLE = publication?.vehicle.year_vehicle ?? NO_REGISTER
  const MILEAGE_VEHICLE = `${
    publication?.vehicle.mileage !== undefined
      ? publication?.vehicle.mileage + ' km'
      : NO_REGISTER
  }`

  const CONDITION_VEHICLE =
    publication?.vehicle.vehicle_general_condition.name ?? NO_REGISTER

  const VEHICLE_LENGTH = `${
    publication?.vehicle.dimensions.total_length !== undefined
      ? publication?.vehicle.dimensions.total_length + ' m'
      : NO_REGISTER
  } `

  const VEHICLE_WIDTH = `${
    publication?.vehicle.dimensions.total_width !== undefined
      ? publication?.vehicle.dimensions.total_width + ' m'
      : NO_REGISTER
  } `

  const VEHICLE_HEIGHT = `${
    publication?.vehicle.dimensions.total_height !== undefined
      ? publication?.vehicle.dimensions.total_height + ' m'
      : NO_REGISTER
  } `

  const VEHICLE_HORSEPOWER = `${
    publication?.vehicle.horsepower !== undefined
      ? publication?.vehicle.horsepower + ' HP'
      : NO_REGISTER
  }`

  const VEHICLE_FUEL = publication?.vehicle.vehicle_fuel.name ?? NO_REGISTER

  const VEHICLE_EMISSION =
    publication?.vehicle.powertrains.vehicle_emissions_standards.name ??
    NO_REGISTER

  const VEHICLE_TRANSMISSION =
    publication?.vehicle.powertrains.vehicle_transmission.transmission_name ??
    NO_REGISTER

  const VEHICLE_SPEEDS =
    publication?.vehicle.powertrains.number_speeds.toString() ?? NO_REGISTER

  const VEHICLE_POWER_STEERING =
    publication?.vehicle.powertrains.power_steering ?? false

  const VEHICLE_ABS = publication?.vehicle.powertrains.abs ?? false

  const VEHICLE_ASR = publication?.vehicle.powertrains.asr ?? false

  const VEHICLE_CABIN =
    publication?.vehicle.cabins.vehicle_cabin_types.name ?? NO_REGISTER

  const VEHICLE_CRUISE_CONTROL =
    publication?.vehicle.cabins.cruise_control ?? false

  const VEHICLE_TACHOGRAPH = publication?.vehicle.cabins.tachograph ?? false

  const VEHICLE_DIGITAL_TACHOGRAPH =
    publication?.vehicle.cabins.digital_tachograph ?? false

  const VEHICLE_AIR_CONDITIONING =
    publication?.vehicle.cabins.air_conditioning ?? false

  const VEHICLE_STATIONARY_HEATING =
    publication?.vehicle.cabins.stationary_heating ?? false

  const VEHICLE_COLOR_CABIN = publication?.vehicle.cabins.color ?? NO_REGISTER

  const VEHICLE_NUMBER_AXLES =
    publication?.vehicle.chassis.number_axles.toString() ?? NO_REGISTER

  const VEHICLE_KERB_WEIGHT = `${
    publication?.vehicle.chassis.kerb_weight !== undefined
      ? publication?.vehicle.chassis.kerb_weight + ' Kg'
      : NO_REGISTER
  } `

  const VEHICLE_GROSS_WEIGHT = `${
    publication?.vehicle.chassis.kerb_weight !== undefined
      ? publication?.vehicle.chassis.gross_vehicle_weight + ' Kg'
      : NO_REGISTER
  } `

  const VEHICLE_AXLE_CONFIG =
    publication?.vehicle.chassis.vehicle_axle_configuration.name ?? NO_REGISTER

  const VEHICLE_TOTAL_FUEL = `${
    publication?.vehicle.chassis.total_fuel_capacity !== undefined
      ? publication?.vehicle.chassis.total_fuel_capacity + ' L'
      : NO_REGISTER
  } `

  const VEHICLE_AUXILIARY_TANK =
    publication?.vehicle.chassis.auxiliary_fuel_tank ?? false

  const VEHICLE_SUSPENSION_TYPE =
    publication?.vehicle.chassis.suspension_type ?? NO_REGISTER

  const VEHICLE_AXLE_TIRE_SIZE =
    publication?.vehicle.axles_tires.vehicle_tire_size.size ?? NO_REGISTER

  const VEHICLE_TYPE_TIRES =
    publication?.vehicle.axles_tires.vehicle_suspension.name ?? NO_REGISTER

  const VEHICLE_GPS = publication?.vehicle.other_specifications.gps ?? false
  const VEHICLE_RADIO = publication?.vehicle.other_specifications.radio ?? false
  const VEHICLE_AIR =
    publication?.vehicle.other_specifications.air_conditioning ?? false
  const VEHICLE_LED =
    publication?.vehicle.other_specifications.led_lights ?? false
  const VEHICLE_SPARE_TIRES =
    publication?.vehicle.other_specifications.spare_tires ?? false
  const VEHICLE_WARRANTY =
    publication?.vehicle.other_specifications.warranty ?? false

  return (
    <div>
      <div className='grid md:grid-cols-2 gap-x-6 dark:text-white'>
        <div className='flex flex-col mb-3'>
          <h1 className='font-semibold text-blackText dark:text-white'>
            {'Especificaciones del vehículo'}
          </h1>
          <Divider />
          <Spacer />
          <ItemInfo title='Año de fabricación' value={YEAR_VEHICLE} />
          <ItemInfo title='Kilometraje' value={MILEAGE_VEHICLE} />
          <ItemInfo title='Condición técnica' value={CONDITION_VEHICLE} />
        </div>
        <div className='flex flex-col mb-3'>
          <h1 className='font-semibold text-blackText dark:text-white'>
            {'Dimensiones'}
          </h1>
          <Divider />
          <Spacer />
          <ItemInfo
            title='Longitud total del vehículo'
            value={VEHICLE_LENGTH}
          />
          <ItemInfo title='Ancho total del vehículo' value={VEHICLE_WIDTH} />
          <ItemInfo title='Altura total del vehículo' value={VEHICLE_HEIGHT} />
        </div>
        <div className='flex flex-col mb-3'>
          <h1 className='font-semibold text-blackText dark:text-white'>
            {'Drivetrain'}
          </h1>
          <Divider />
          <Spacer />
          <ItemInfo title='Capacidad del motor' value={VEHICLE_HORSEPOWER} />
          <ItemInfo title='Combustible' value={VEHICLE_FUEL} />
          <ItemInfo title='Estándar de emisiones' value={VEHICLE_EMISSION} />
          <ItemInfo
            title='Clase de caja de cambios'
            value={VEHICLE_TRANSMISSION}
          />
          <ItemInfo title='Nº de las velocidades' value={VEHICLE_SPEEDS} />
          <ItemCheckValue
            title='Dirección asistida'
            value={VEHICLE_POWER_STEERING}
          />
          <ItemCheckValue title='ABS' value={VEHICLE_ABS} />
          <ItemCheckValue title='ASR' value={VEHICLE_ASR} />
        </div>
        <div className='flex flex-col mb-3'>
          <h1 className='font-semibold text-blackText dark:text-white'>
            {'Cabina'}
          </h1>
          <Divider />
          <Spacer />
          <ItemInfo title='Tipo de cabina' value={VEHICLE_CABIN} />
          <ItemCheckValue
            title='Control de velocidad'
            value={VEHICLE_CRUISE_CONTROL}
          />
          <ItemCheckValue title='Tacógrafo' value={VEHICLE_TACHOGRAPH} />
          <ItemCheckValue
            title='Tacógrafo Digital'
            value={VEHICLE_DIGITAL_TACHOGRAPH}
          />
          <ItemCheckValue
            title='Aire acondicionado'
            value={VEHICLE_AIR_CONDITIONING}
          />
          <ItemCheckValue
            title='Calefacción autónoma'
            value={VEHICLE_STATIONARY_HEATING}
          />
          <ItemInfo title='Color de la cabina' value={VEHICLE_COLOR_CABIN} />
        </div>
        <div className='flex flex-col mb-3'>
          <h1 className='font-semibold text-blackText dark:text-white'>
            {'Chasis'}
          </h1>
          <Divider />
          <Spacer />
          <ItemInfo title='Número de ejes' value={VEHICLE_NUMBER_AXLES} />
          <ItemInfo title='Configuración de ejes' value={VEHICLE_AXLE_CONFIG} />
          <ItemInfo title='Peso neto' value={VEHICLE_KERB_WEIGHT} />
          <ItemInfo title='Peso bruto' value={VEHICLE_GROSS_WEIGHT} />
          <ItemInfo
            title='Contenido total del depósito de combustible'
            value={VEHICLE_TOTAL_FUEL}
          />
          <ItemCheckValue
            title='Tanque auxiliar'
            value={VEHICLE_AUXILIARY_TANK}
          />
          <ItemInfo
            title='Tipo de suspensión'
            value={VEHICLE_SUSPENSION_TYPE}
          />
        </div>
        <div className='flex flex-col mb-3'>
          <h1 className='font-semibold text-blackText dark:text-white'>
            {'Ejes y neumáticos'}
          </h1>
          <Divider />
          <Spacer />
          <ItemInfo
            title='Dimensión de la llanta'
            value={VEHICLE_AXLE_TIRE_SIZE}
          />
          <ItemInfo title='Tipo de ejes' value={VEHICLE_TYPE_TIRES} />
        </div>
        <div className='flex flex-col mb-3'>
          <h1 className='font-semibold text-blackText dark:text-white'>
            {'Adicionales'}
          </h1>
          <Divider />
          <Spacer />
          <ItemCheckValue title='GPS' value={VEHICLE_GPS} />
          <ItemCheckValue title='Radio' value={VEHICLE_RADIO} />
          <ItemCheckValue title='Aire acondicionado' value={VEHICLE_AIR} />
          <ItemCheckValue title='Luces LED' value={VEHICLE_LED} />
          <ItemCheckValue
            title='Neumáticos de repuestos'
            value={VEHICLE_SPARE_TIRES}
          />
          <ItemCheckValue title='Garantía' value={VEHICLE_WARRANTY} />
        </div>
      </div>
    </div>
  )
}

export default TabCharacteristics
