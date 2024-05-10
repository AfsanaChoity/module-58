import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import axios from 'axios';

const Checkout = () => {
    const service = useLoaderData()
	console.log(service)
    const {title, price, _id, img} = service;
	const { user } = useContext(AuthContext);

	const handleBookService = (event) =>{
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const date = form.date.value;
		const email  = user?.email;
		const booking = {
			customerName : name,
			email,
			img,
			date,
			service: title,
			service_id: _id,
			price

		}
		console.log(booking);

		axios.post('http://localhost:5000/bookings', {
			booking
		})
		.then(result => {
			console.log(result)
			if(result.data.insertedId){
				alert("successful!")
			}
		})
		.catch(error => console.error(error))


	}
    return (
        <div>
            <h2 className="text-center">Book Service: {title} </h2>
            <div>
            <section className="p-6  ">
	<form onSubmit={handleBookService} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
			
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="firstname" className="text-sm"> Name</label>
					<input id="firstname" type="text" placeholder="First name" name="name" defaultValue={user?.displayName} className="w-full border p-2 rounded-md focus:ring  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="lastname" className="text-sm">Date</label>
					<input id="" type="date" placeholder="" name="date" className="w-full border p-2 rounded-md focus:ring   focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="email" className="text-sm">Email</label>
					<input id="email" type="email" defaultValue={user?.email} placeholder="Email" name="email" className="w-full border p-2 rounded-md focus:ring  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="address" className="text-sm">Deu amount</label>
					<input id="address" type="text" placeholder="" defaultValue={'$'+price} name="phone" className="w-full border p-2 rounded-md focus:ring  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full ">
					<label htmlFor="city" className="text-sm">Message</label>
					<textarea id="city" type="text" placeholder="Your Message" name="message" className="w-full border p-2 rounded-md focus:ring  focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				
			</div>
           
		</fieldset>
        <div>
                <input type="submit" value="Order Confirm" className="btn btn-block" />
                
            </div>
	</form>
</section>
            </div>
        </div>
    );
};

export default Checkout;