import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useHomeContext } from './Homelayout'
import SidebarMerchant from '../components/Sidebar-main-desktop'
import NavMechantMain from '../components/Nav-desktop-merchant'
import { customerLinks } from '../utils/constants'

const CDashboardLayout = () => {
    const { user } = useHomeContext()
    const navigate = useNavigate()
    useEffect(()=>{
        if(user?.userRole !== 'customer'){
            navigate('/')
        }
    },[user])
    return (
        <div className='w-full background-white '>
            {/* <div>
                <NavMechantMain />
            </div> */}
            <div className='flex'>
                <div>
                    <div className="hidden lg:block">
                        <SidebarMerchant links={customerLinks} />
                    </div>
                    <div></div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default CDashboardLayout