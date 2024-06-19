import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CpuChipIcon from '@heroicons/react/24/outline/CpuChipIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useEffect, useState } from 'react'
import ArrowDownTrayIcon  from '@heroicons/react/24/outline/ArrowDownTrayIcon'
import ShareIcon  from '@heroicons/react/24/outline/ShareIcon'
import EnvelopeIcon  from '@heroicons/react/24/outline/EnvelopeIcon'
import EllipsisVerticalIcon  from '@heroicons/react/24/outline/EllipsisVerticalIcon'
import ArrowPathIcon  from '@heroicons/react/24/outline/ArrowPathIcon'
import { isArray } from 'chart.js/helpers'
import { download, generateCsv, mkConfig } from 'export-to-csv'

function Dashboard(){
    const [wss, setWss] = useState(null);
    const [data, setData] = useState([]);
    const [statsDataValue1, setStatsDataValue1] = useState(0);
    const [statsDataValue2, setStatsDataValue2] = useState(0);
    const [dataGroupedByMAC, setDataGroupedByMAC] = useState({});
    const [dataUpdateHead, setDataUpdateHead] = useState({});
    const dispatch = useDispatch()
    useEffect(() => {
        const websocket = new WebSocket('wss://m45bd73suj.execute-api.us-east-1.amazonaws.com/production');
 
        websocket.onopen = () => {
            console.log('WebSocket is connected');
            websocket.send(JSON.stringify({"action": "updateData"}))
        };
 
        websocket.onmessage = async (evt) => {
            const data_parse = await JSON.parse(evt.data)
            // console.log(data_parse)
            
            if ( isArray(data_parse))
            {
                await data_parse.sort(function(b, a){return parseInt(a?.time) - parseInt(b?.time)})
                await setData(data_parse)
                const groupByMAC = await Object.groupBy(data_parse, data_item => {
                    return data_item.MAC;
                });
                await setDataGroupedByMAC(groupByMAC)
                let data_analysis = []
                for (let [item, value] of Object.entries(groupByMAC)) {
                    console.log(item, value)
                    data_analysis.push(value[0])
                }
                setDataUpdateHead(data_analysis)
                await setStatsDataValue1(Object.keys(await groupByMAC).length)
                await setStatsDataValue2(await data_parse.length)
            }
        };
 
        websocket.onclose = () => {
            console.log('WebSocket is closed');
        };
 
        setWss(websocket);
        return () => {
            websocket.close();
        };
    }, []);

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    const updateData = () => {
        if (wss) {
            wss.send(JSON.stringify({"action": "updateData"}))
        }
    }

    const csvConfig = mkConfig({ useKeysAsHeaders: true });

    const downloadCSV = async () => {
        const csv = await generateCsv(csvConfig)(data);
        await download(csvConfig)(csv);
    }

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-right "></div>
            <div className="text-right ">
                <button className="btn btn-ghost btn-sm normal-case" onClick={updateData} ><ArrowPathIcon className="w-4 mr-2"/>Refresh Data</button>
                <button className="btn btn-ghost btn-sm normal-case  ml-2" onClick={downloadCSV}><ArrowDownTrayIcon className="w-4 mr-2"/>Download</button>
                

                {/* <div className="dropdown dropdown-bottom dropdown-end  ml-2">
                    <label tabIndex={0} className="btn btn-ghost btn-sm normal-case btn-square "><EllipsisVerticalIcon className="w-5"/></label>
                    <ul tabIndex={0} className="dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a><ArrowDownTrayIcon className="w-4"/>Download</a></li>
                    </ul>
                </div> */}
            </div>
        </div>
        
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {/* {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} value={k == 0 ? statsDataValue.val1 : statsDataValue.val2} {...d} colorIndex={k}/>
                        )
                    })
                } */}
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-primary`}><CpuChipIcon className='w-8 h-8'/></div>
                        <div className="stat-title dark:text-slate-300">Total device</div>
                        <div className={`stat-value dark:text-slate-300 text-primary`}>{statsDataValue1}</div>
                        <div className={"stat-desc"}>Both active and inactive</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className={`stat-figure dark:text-slate-300 text-primary`}><CircleStackIcon className='w-8 h-8'/></div>
                        <div className="stat-title dark:text-slate-300">Total data</div>
                        <div className={`stat-value dark:text-slate-300 text-primary`}>{statsDataValue2}</div>
                        <div className={"stat-desc"}>Data come from sensor</div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels data={dataUpdateHead} title={"Temperature Sensor"} colored={1}/>
                <UserChannels data={data} title={"Data log"} colored={0}/>
            </div>
        
        </>
    )
}

export default Dashboard