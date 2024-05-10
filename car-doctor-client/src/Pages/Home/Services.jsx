import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {


    const [services, setServices] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])

    return (
        <div className="mt-[100px]">
            <div className="text-center">
                <h2  className="text-[#FF3811] text-xl font-bold mb-3">Services</h2>
                <p className="text-[45px] font-bold text-[#151515] mb-5">Our Service Area</p>
                <p className=" text-[#737373] text-[16px] leading-[30px] w-[700px] mx-auto">the majority have suffered alteration in some form, by injected humour, or Randomised  words which do not look even slightly believable.</p>
            </div>

            {/* service data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                   services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;