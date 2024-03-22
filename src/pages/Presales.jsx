import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import MainInput from '../components/MainInput'
import { PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, PencilSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import TableProvider from '../components/TableProvider'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CreateUpdateModal from '../components/Authenticated/Team/CreateUpdateModal'
import api from '../services/api'



export default function Teams({ title }) {
    document.title = title

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [tempData, setTempData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await api.get(`/api-v1/team-members`);
                setTempData(response.data.data);
            } catch (error) {
                console.error('Error fetching opportunities:', error);
            }
        };

        fetchOpportunities();
    }, []);
    const paginatedData = tempData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])


    return (
        <AuthenticatedLayout>
            <div className='flex justify-between gap-5 items-center' >
                {/* <div className='w-[30%] relative flex items-center' >
                    <MainInput
                        placeholder={"Search Email"}
                    />
                    <MagnifyingGlassIcon className='text-[#A6A9B9] w-5 h-5 absolute right-5' />
                </div> */}

                {/* <button onClick={() => {
                    setShow(true)
                    setSelectedData(null)
                }} className='flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                    <PlusIcon className='w-6 h-6 text-white' />
                    <div>Create Team Member</div>
                </button> */}
            </div>
            <div className='bg-white rounded-lg mt-10' >
                <div className='flex items-center justify-between h-20 p-5' >
                    <div className='flex items-center gap-5' >
                        <div className="text-lg lg:text-2xl text-app-blue font-semibold" >Presales</div>
                        <button
                            onClick={() => setLoading(true)}
                        >
                            <ArrowPathIcon className={`${loading ? "animate-spin" : ""} w-6 h-6`} />
                        </button>
                    </div>
                    {/* <button>
                        <EllipsisVerticalIcon className='w-8 h-8' />
                    </button> */}
                </div>
                <Divider />
                <TableProvider
                    currentPage={currentPage}
                    setCurrentPage={page => setCurrentPage(page)}
                    itemsPerPage={itemsPerPage}
                    pagination={true}
                    data={tempData}
                    loading={loading}
                    emptyMessage="No Partners Found"
                >
                    <thead className="text-xs text-app-blue uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-5 px-6 border-b">
                                ID
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Profile Image
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Name
                            </th>
                            
                            <th scope="col" className="py-5 px-6 border-b">
                                Email
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Contact Number
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Designation
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((row, index) => {
                            if(row?.designation == "Presales"){
                            return (
                                <tr key={index} className="bg-white border-b text-gray-900 ">
                                    <td className="py-5 px-6" >{row?._id}</td>
                                    <td className="py-5 px-6" >
                                        <Avatar
                                            alt={row?.name}
                                            src={row?.image}
                                            sx={{ border: "0.5px solid #ABB3BB" }}
                                        />
                                    </td>
                                    <td className="py-5 px-6" >{row?.name}</td>
                                    
                                    <td className="py-5 px-6" >{row?.email}</td>
                                    <td className="py-5 px-6" >{row?.phone}</td>
                                    <td className="py-5 px-6" >{row?.designation}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setShow(true)
                                                setSelectedData(row)
                                            }}
                                        >
                                            <PencilSquareIcon className='w-6 h-6 text-app-blue-2' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }})}
                    </tbody>
                </TableProvider>
            </div>
            <CreateUpdateModal
                data={selectedData}
                show={show}
                onClose={() => setShow(false)}
            />
        </AuthenticatedLayout>
    )
}
