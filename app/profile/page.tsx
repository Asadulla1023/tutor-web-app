import Error from '../components/local/event/Error'
import axios from 'axios'
import UserInformation from '../components/local/profile/UserInformation'

let err: string

async function getData(token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhOGZlNjFkZDNiZDNjZDdlODczNzQiLCJuYW1lIjoiZXMiLCJzdXJuYW1lIjoic3NkIiwicGhvbmUiOiI5OTg5ODc4ODg5MjEiLCJlbWFpbCI6ImVlQGZtZm1mLmNjIiwiaWF0IjoxNjk4MzQyMDY1fQ.Nrg4Pjn_f5nSLCSaHU0G6PNpKUCtoiFV6Vm0cc9RHJQ") {
    try {
        const res = axios.get(`${process.env.NEXT_PUBLIC_API}/api/users/current`, {
            headers: {
                Authorization: token
            }
        })
        return (await res).data
    } catch (error) {
        console.log("rewgfwregf");
    }

}
const Page = async () => {
    const data = await getData()
    console.log(data);
    return (
        <>
            <UserInformation />
        </>
    )
}

export default Page