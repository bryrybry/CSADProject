import { getAllBusServices, getBusTiming } from '../../helper_functions'
import React, { useState, useEffect } from 'react';
import BouncyBouncy from '../LoadingPage';
import { ArrivalTimesElement } from './ArrivalTimesList';

const BusStopList = (props) => {
    const [busServicesList, setBusServicesList] = useState([])
    const [busTimesListList, setBusTimesListList] = useState([])

    // updates list when props updates
    useEffect(() => {
        const resetLists = () => {
            setBusServicesList([])
            setBusTimesListList([])
        }
        const updateLists = async () => {
            const BusStopName = props.data.busStopName
            const BusStopCode = props.data.busStopCode
            const busServices = await getAllBusServices(BusStopCode)
            setBusServicesList(busServices)
            const busTimesList = []
            for (const busService of busServices) {
                const list = await getBusTiming(BusStopCode, busService)
                busTimesList.push(list)
            }
            setBusTimesListList(busTimesList)
        }
        resetLists();
        updateLists();
        
    }, [props.data]);    

    const updateBusTimes = async (index) => {
        const newBusTimes = [...busTimesListList]
        const busTiming = await getBusTiming(props.data.busStopCode, busServicesList[index])
        newBusTimes[index] = busTiming
        setBusTimesListList(newBusTimes)
    }
    
    return (
        <>
        {
            (busServicesList.length === busTimesListList.length) ? // finished loading
            (
                <>
                <h3>{props.data.busStopName}</h3>
                <div className="list">
                {Array.from({ length: busServicesList.length }, (_, index) => (
                  <div key={index} className="bar">
                    <ul><li>
                        <BusStopElement 
                        index={index}
                        busService={busServicesList[index]} 
                        busTimesList={busTimesListList[index]}
                        updateBusTimes={updateBusTimes} />
                    </li></ul>
                  </div>
                ))}
              </div>
              </>
            ) :
            (
                <BouncyBouncy/>
            )
        }
        </>
    )
}

const BusStopElement = (props) => {
    return (
        <ArrivalTimesElement
        index={props.index}
        header={props.busService}
        subheader={""}
        busTimesList={props.busTimesList}
        updateBusTimes={props.updateBusTimes}/>
    )
}

export default BusStopList