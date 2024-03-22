import React from 'react'
import Avatar from '@mui/material/Avatar';

export default function HeaderUser() {
    return (
        <div className='flex items-center gap-3' >
            <Avatar
                alt="Remy Sharp"
                src="/images/test.png"
                sx={{ border: "0.5px solid #ABB3BB", objectFit: "contain" }}
            />
            <div className='text-sm' >
                <div className='font-semibold' >Jason Maning</div>
                <div className='text-xs' >Admin</div>
            </div>
        </div>
    )
}
