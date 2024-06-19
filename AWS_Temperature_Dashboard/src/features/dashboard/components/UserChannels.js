import { isArray } from "chart.js/helpers"
import TitleCard from "../../../components/Cards/TitleCard"
import FaceSmileIcon  from '@heroicons/react/24/solid/FaceSmileIcon'

function UserChannels({data, title, colored, hightTemperature = 100, lowTemperature = 0}){
    return(
        <TitleCard title={title}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Time</th>
                        <th className="normal-case">MAC</th>
                        <th className="normal-case">Temperature</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            isArray(data) ? data.map((u, k) => {
                                let date = new Date(parseInt(u?.time))
                                let color_temp = 0
                                if (colored){
                                    color_temp = u?.temperature > hightTemperature ? "red" : (u?.temperature < lowTemperature ? "blue" : "")
                                }
                                return(
                                    <tr key={k} style={{color: color_temp? color_temp: "", fontWeight: color_temp ? "bold" : ""}}>
                                        <th>{k+1}</th>
                                        <td>{date.toLocaleString()}</td>
                                        <td>{u?.MAC}</td>
                                        <td>{`${u?.temperature} oC`}</td>
                                        {colored? 
                                            <td>{Date.now() - u?.time < 120000 ? <FaceSmileIcon className="w-4 mr-2 text-lime-500 animate-pulse"/> : <></>}</td>
                                            : null}
                                    </tr>
                                )
                            }) : <></>
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels