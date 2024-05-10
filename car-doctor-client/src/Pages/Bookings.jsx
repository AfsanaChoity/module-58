import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url])
    console.log(bookings)

    const handleDelete = id => {
        console.log(id);
        const proceed = confirm("Are you sure you want to delete?");
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount > 0){
                        alert('deleted successful');
                        const remaining = bookings.filter(booking => booking._id !== id)
                        setBookings(remaining);
                    }
                })

        }
    }
    const handleBookingConfirm = id =>{
        console.log(id)
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status : 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                //update state
                const remaining = bookings.filter(booking => booking._id !== id
                );
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBookings(newBookings);
            }
        })
    }

    return (
        <div>
            <h2 className="text-4xl text-center">My Bookings: {bookings.length}</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">

                        {
                            bookings.map(booking => <>
                                <tbody key={booking.booking.service_id}>
                                    {/* row 1 */}
                                    <tr>
                                        <th>
                                            <label>
                                                <button onClick={() => handleDelete(booking._id)} className="btn btn-circle btn-sm btn-outline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        {
                                                            booking.booking.img && <img src={booking.booking.img} />
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{booking.booking.service}</div>
                                                    <div>
                                                        {booking._id}
                                                    </div>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{booking.booking.date}</p>
                                        </td>
                                        <td>{booking.booking.price}$</td>
                                        <th>
                                            {
                                                booking.status === 'confirm'? <span>Confirmed</span> :

                                                <button onClick={() => handleBookingConfirm(booking._id)} className="btn btn-ghost btn-xs">Please Confirm</button>
                                            }
                                        </th>
                                    </tr>

                                </tbody>
                            </>)
                        }


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;