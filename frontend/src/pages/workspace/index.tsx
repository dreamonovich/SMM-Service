import { useParams } from "react-router-dom"

export const Workspace = () => {
    const {id} = useParams()

  return (
    <div>Workspace {id}</div>
  )
}
