import axios from 'axios';
import { busRouteAPIQuerySkip } from './helper_func2';

export async function BusArrival(busStopCode) {
  try {
    const response = await axios.get(`http://localhost:5000/api/bus-arrival?busStopCode=${busStopCode}`);
      return response.data;
  } catch (error) {
    console.error('BusArrival API Call Failed:', error);
  }
  return null
}

export async function BusRoutes(busService) {
  try {
    const response = await axios.get(`http://localhost:5000/api/bus-routes?skip=${busRouteAPIQuerySkip(busService)}`);
      return response.data;
  } catch (error) {
    console.error('BusRoutes API Call Failed:', error);
  }
  return null
}