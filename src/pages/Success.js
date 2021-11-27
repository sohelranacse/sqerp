import { useLocation } from "react-router"

export const Success = () => {
  const location = useLocation()

  console.log(location)
  return (
    <div>
      Succeessful
    </div>
  )
}
