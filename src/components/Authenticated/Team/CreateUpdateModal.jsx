import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import MainInput from '../../MainInput'
import MainSelect from '../../MainSelect'
import MainMultipleSelect from '../../MainMultipleSelect'
import MainImageInput from '../../MainImageInput'
import api from '../../../services/api'


const designations = [
    {name: 'Head of Sales' },
    {name: 'Head of Transport' },
    {name: 'Head of IT' },
    {name: 'Chief Executive officer' },
    {name: 'Presales' },
]
const userRoles = [
    {name: 'editor' },
    {name: 'sales' },
    {name: 'admin' },
    {name: 'team member' },
]
const initialState = {
    //industryType: null,
    image: null
}

export default function CreateUpdateModal({ show, onClose, data }) {

    const [team, setTeam] = useState(initialState)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setTeam(data)
        }
        if (!data) {
            setTeam(initialState)
        }
    }, [data])

    async function onCreate() {
        // console.log('Team : ',team);
        try {
            const response = await api.post('/api-v1/team-members', team);

            if (response.status === 201) {
                console.log('Team Member created successfully');
                onClose();
            } else {
                console.error('Failed to create Team Member:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating client:', error);
        }
    }

    async function onUpdate() {
        // console.log(team)
        try {
            const response = await api.put(`/api-v1/team-members/${team._id}`, team);

            if (response.status === 200 || response.status === 201) {
                console.log('Team Member updated successfully');
                onClose();
            } else {
                console.error('Failed to update Team Member:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating Team Member:', error);
        }
    }
    return (
        <Transition
            show={show}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={'w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#0000006d]'}
        >
            <div className='bg-white shadow-lg rounded-md h-[90%] lg:h-fit w-[95%] lg:w-[70%]' >
                <div className='bg-[#C5C5C533] h-14 flex justify-between items-center px-10' >
                    <div className='font-semibold' >{data ?
                        <span>View Team Member - <span className='text-app-blue-4' >{data?.name}</span></span>
                        : "Create New Client"}</div>
                    <button disabled={loading} onClick={onClose} className='flex justify-center items-center text-app-gray-3' >
                        <XCircleIcon className='w-7 h-7' />
                    </button>
                </div>
                <div className='max-h-[80vh] h-[80vh] lg:h-fit overflow-scroll no-scrollbar' >
                    <div className='flex justify-center items-center mt-5' >
                        <MainImageInput
                            type="client"
                            onChange={file => setTeam({ ...team, image: file.path })}
                            value={team?.image}
                        />
                    </div>
                    <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10' >
                        <MainInput
                            disabled={loading}
                            value={team?.name}
                            onChange={text => setTeam({ ...team, name: text })}
                            label={" Name"}
                            placeholder={"Enter Name"}
                        />
                        {/* <MainInput
                            disabled={loading}
                            value={team?.firstName}
                            onChange={text => setTeam({ ...team, firstName: text })}
                            label={"First Name"}
                            placeholder={"Enter First Name"}
                        />
                        <MainInput
                            disabled={loading}
                            value={team?.lastName}
                            onChange={text => setTeam({ ...team, lastName: text })}
                            label={"Last Name"}
                            placeholder={"Enter Last Name"}
                        /> */}
                        <MainSelect
                            disabled={loading}
                            value={designations?.find(row => row?.name == team?.designation)}
                            onChange={value => setTeam({ ...team, designation: value?.name })}
                            label={"Designation"}
                            placeholder={"Please Select Designation"}
                            options={designations}
                        />
                        <MainSelect
                            disabled={loading}
                            value={userRoles?.find(row => row?.name == team?.userRole)}
                            onChange={value => setTeam({ ...team, userRole: value?.name })}
                            label={"User Role"}
                            placeholder={"Please Select User Role"}
                            options={userRoles}
                        />
                        <MainInput
                            disabled={loading}
                            value={team?.email}
                            onChange={text => setTeam({ ...team, email: text })}
                            label={"Email"}
                            placeholder={"Enter Email"}
                        />
                        <MainInput
                            disabled={loading}
                            value={team?.phone}
                            onChange={text => setTeam({ ...team, phone: text })}
                            label={"Contact Number"}
                            placeholder={"Enter Contact Number"}
                        />
                    </div>
                    <div className='flex justify-center items-center gap-5 mb-5 mt-10' >
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className='disabled:bg-app-gray disabled:border-app-gray disabled:text-white flex items-center gap-3 border text-app-blue-2 border-app-blue-2 rounded-lg w-fit px-10 py-2' >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                data ? onUpdate() : onCreate();
                            }}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white'
                        >
                            {data ? "Update" : "Create"}
                        </button>
                    </div>
                </div>

            </div>
        </Transition>
    )
}
