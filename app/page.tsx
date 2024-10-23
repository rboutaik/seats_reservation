"use client"

import { useState, FormEvent } from 'react'

interface Reservation {
  id: number
  name: string
  destination: string
  time: string
  seat: string
}

export default function Component() {
  const [name, setName] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedSeat, setSelectedSeat] = useState<string>('')
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleSeatClick = (seat: string) => {
    if (!reservations.find(reservation => reservation.seat === seat)) {
      setSelectedSeat(prevSeat => prevSeat === seat ? '' : seat)
    }
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingId !== null) {
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === editingId
            ? { ...reservation, name, destination, time: selectedTime, seat: selectedSeat }
            : reservation
        )
      )
      setEditingId(null)
    } else {
      const newReservation = { id: Date.now(), name, destination, time: selectedTime, seat: selectedSeat }
      setReservations(prevReservations => [...prevReservations, newReservation])
    }

    // Reset form
    setName('')
    setDestination('')
    setSelectedTime('')
    setSelectedSeat('')
  }

  const handleEdit = (reservation: Reservation) => {
    setName(reservation.name)
    setDestination(reservation.destination)
    setSelectedTime(reservation.time)
    setSelectedSeat(reservation.seat)
    setEditingId(reservation.id)
  }

  const handleDelete = (id: number) => {
    setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== id))
  }

  return (
    <div className="bg-[#f5f7fa] text-[#2d3748] min-h-screen font-sans">
      <div className="max-w-[800px] mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-[#2c5282] text-4xl font-bold drop-shadow-sm">School Bus Seats Reservation</h1>
        </header>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-[#4a5568]">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border-2 border-[#e2e8f0] rounded-lg text-base transition-colors focus:outline-none focus:border-[#4299e1]"
                />
              </div>
              <div>
                <label htmlFor="destination" className="block mb-2 font-medium text-[#4a5568]">Destination</label>
                <input
                  type="text"
                  id="destination"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 border-2 border-[#e2e8f0] rounded-lg text-base transition-colors focus:outline-none focus:border-[#4299e1]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#4a5568]">Select Departure Time</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {['21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeClick(time)}
                    className={`p-3 text-center rounded-md cursor-pointer transition-all duration-300 ${
                      selectedTime === time
                        ? 'bg-[#2b6cb0] text-white'
                        : 'bg-[#edf2f7] hover:bg-[#4299e1] hover:text-white hover:-translate-y-0.5'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-[400px] mx-auto mt-8 bg-[#f7fafc] p-8 rounded-lg">
              <h3 className="text-center mb-4 text-[#4a5568]">Select Your Seat</h3>
              <div className="grid grid-cols-4 gap-4">
                {['1', '2', '3', '4', '5', '6', '7', '8'].map((seat) => {
                  const reservation = reservations.find(r => r.seat === seat)
                  return (
                    <div key={seat} className="relative group">
                      <button
                        type="button"
                        onClick={() => handleSeatClick(seat)}
                        className={`w-[50px] h-[50px] flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 font-semibold ${
                          reservation
                            ? 'bg-[#fc8181] border-2 border-[#f56565] opacity-90 cursor-default'
                            : selectedSeat === seat
                            ? 'bg-[#4299e1] border-2 border-[#2b6cb0] text-white'
                            : 'bg-[#9ae6b4] border-2 border-[#68d391] hover:bg-[#68d391] hover:scale-110'
                        }`}
                        disabled={!!reservation}
                      >
                        {seat}
                      </button>
                      {reservation && (
                        <div className="absolute top-0 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleEdit(reservation)}
                            className="bg-yellow-500 text-white p-1 rounded-full hover:bg-yellow-600 transition-colors duration-300"
                            aria-label="Edit reservation"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(reservation.id)}
                            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-300"
                            aria-label="Delete reservation"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-center gap-8 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#9ae6b4] border-2 border-[#68d391] rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#fc8181] border-2 border-[#f56565] rounded"></div>
                  <span>Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#4299e1] border-2 border-[#2b6cb0] rounded"></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4299e1] text-white py-4 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-[#2b6cb0] hover:-translate-y-0.5 mt-4"
            >
              {editingId !== null ? 'Update Reservation' : 'Complete Reservation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}