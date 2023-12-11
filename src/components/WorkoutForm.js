import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [truck, setTruck] = useState('')
  const [number, setNumber] = useState('')
  const [aggregates, setAggregates] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {truck, number, aggregates}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTruck('')
      setNumber('')
      setAggregates('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a truck</h3>

      <label>Truck owner:</label>
      <input 
        type="text"
        onChange={(e) => setTruck(e.target.value)}
        value={truck}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Plate number:</label>
      <input 
        type="text"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Aggregates:</label>
      <input 
        type="text"
        onChange={(e) => setAggregates(e.target.value)}
        value={aggregates}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Trucking</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm