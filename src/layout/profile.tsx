import { useAppSelector, useAppDispatch } from '../hooks'
import SimpleListMenu from '../components/SimpleListMenu'


const Profile = () => {
    const userData = useAppSelector((state) => state.userData)
    return (
        <>
            {userData.logged && (
                <>
                    <SimpleListMenu />
                </>
            )}
        </>
    )
}

export default Profile