export interface VehicleIcon {
  default?: string
  large?: string
  medium?: string
  small?: string
}

export interface VehicleType {
  name: string
  title: string
  icons: VehicleIcon
}

export interface VehicleNation {
  name: string
  title: string
  color: string
  icons: VehicleIcon
}

export interface Vehicle {
  title: string
  description: string
  icons: VehicleIcon
  level: number
  type: VehicleType
  nation: VehicleNation
}

export interface VehiclesResponse {
  vehicles: Vehicle[]
}

export interface FilterState {
  level: number | null
  nation: string | null
  type: string | null
  search: string
}
