import { request } from 'graphql-request'
import type { VehiclesResponse } from '@/types/types'

const API_URL = 'https://vortex.korabli.su/api/graphql/glossary/'

export async function fetchVehicles(languageCode: string = 'ru'): Promise<VehiclesResponse> {
  const query = `
    query Vehicles($languageCode: String = "ru") {
      vehicles(lang: $languageCode) {
        title
        description
        icons {
          large
          medium
        }
        level
        type {
          name
          title
          icons {
            default
          }
        }
        nation {
          name
          title
          color
          icons {
            small
            medium
            large
          }
        }
      }
    }
  `

  try {
    const data = await request(API_URL, query, { languageCode })
    return data as VehiclesResponse
  } catch (error) {
    console.error('Ошибка при выполнении GraphQL запроса:', error)
    throw error
  }
}
