import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import TableProvider from '../../TableProvider'
import api from '../../../services/api';

const tempData = [
    {
        name: "Brad",
        company: "DB2",
        accountName: "Account 1",
        designation: "Head of Sales",
        contact: "77234564",
        email: "amal@gmail.com",
    },
]

export default function PartnerCard() {
    const [loading, setLoading] = useState(false)
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get(`/api-v1/partners`);
            setTempData(response.data.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])
    return (
        <div className='bg-white rounded-lg min-h-[25rem]' >
            <div className='flex items-center justify-between h-20 p-5' >
                <div className='flex items-center gap-5' >
                    <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Partners</div>
                    <button
                        onClick={() => {
                            setLoading(true)
                        }}
                    >
                        <ArrowPathIcon className={`${loading ? "animate-spin" : ""} w-6 h-6`} />
                    </button>
                </div>
                {/* <button>
                    <EllipsisVerticalIcon className='w-8 h-8' />
                </button> */}
            </div>
            <Divider />
            <TableProvider data={tempData} loading={loading} emptyMessage="No Partners Found" >
                <thead className="text-xs text-app-blue uppercase bg-white">
                    <tr>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Company
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Account Name
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Designation
                        </th>
                        <th scope="col" className="py-3 px-6 border-b border-r">
                            Contact
                        </th>
                        <th scope="col" className="py-3 px-6 border-b">
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tempData?.slice(0, 10).map((row, index) => {
                        return (
                            <tr key={index} className="bg-white border-b text-gray-900 ">
                                <td className="py-3 px-6" >{row?.name}</td>
                                <td className="py-3 px-6" >{row?.company}</td>
                                <td className="py-3 px-6" >{row?.accountName}</td>
                                <td className="py-3 px-6" >{row?.designation}</td>
                                <td className="py-3 px-6" >{row?.clientId ? row.clientId.phone : "-"}</td>
                                <td className="py-3 px-6" >{row?.clientId ? row.clientId.email : "-"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableProvider>
            <div style={{ textAlign: 'center'}}>
            <a href={"/partners"} ><button className='bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white mt-4 mb-4' >
                    <div>View All</div>
            </button></a>
            </div>
        </div>
    )
}
