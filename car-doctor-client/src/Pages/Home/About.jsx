

const About = () => {
    return (
        <div>
            <div className="  mt-[100px] ">
                <div className="flex flex-col lg:flex-row gap-32 lg:gap-12">
                    <div className="lg:w-1/2 relative    ">
                    <img src="/assets/images/about_us/person.jpg" className="w-3/4 rounded-lg h-[473px] " />
                    <img src="/assets/images/about_us/parts.jpg" className="w-1/2 h-[332px] rounded-lg  absolute right-5 top-1/2 border-8 border-white" />
                    </div>
                    
                    <div className="lg:w-1/2">
                        <h3 className="text-[#FF3811] text-xl font-bold mb-5">About Us</h3>

                        <h1 className="text-[45px] font-bold text-[#151515] w-[376px] mb-7">We are qualified & of experience in this field</h1>
                        <p className=" text-[#737373] text-[16px] leading-[30px] w-[490px] mb-5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.</p>

                        <p className=" text-[#737373] text-[16px] leading-[30px] w-[490px] mb-7">The majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>

                        <button className="btn btn-warning  rounded-[5px] bg-[#FF3811] border-none text-white">Get More Info</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;