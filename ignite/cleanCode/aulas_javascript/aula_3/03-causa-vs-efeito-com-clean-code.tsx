// Causa vs Efeito
import { useEffect, useState } from "react"

interface UserData {
  name: string;
  githubUrl: string;
}

function fetchUserData() {
  return {
    data: {
      user: {
        name: 'Joseph Oliveira',
        githubUrl: 'https://github.com/josepholiveira'
      }
    }
  }
}

export function UserProfile() {
  const [isFetchingUserData, setIsFetchingUserData] = useState(false)
  const [userData, setUserData] = useState<UserData>()

  useEffect(() => {
    function loadUserData() {
      setIsFetchingUserData(true)

      const fetchUserDataResponse = fetchUserData()

      setUserData(fetchUserDataResponse.data.user)
      
      setIsFetchingUserData(false)
    }

    loadUserData()
  })

  if (isFetchingUserData) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <img src={`${userData?.githubUrl}.png`} alt="" />
      <a href={userData?.githubUrl}>{userData?.name}</a>
    </div>
  )
}