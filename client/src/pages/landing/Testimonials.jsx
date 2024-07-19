import { useState } from "react"
import meron from "../../assets/images/Meron.jpg";
import zeleke from "../../assets/images/Zeleke.jpg";
import assefa from "../../assets/images/Assefa.jpg";

const Testimony= () => {

    const testimonials = [
        {
            avatar: zeleke,
            name: "Zeleke Desta",
            title: "Cement Dealer",
            quote: "Since using Adulis, our shipping process has become much more streamlined. We've been able to reduce our shipping costs and improve our delivery times."
        },
        {
            avatar: meron,
            name: "Meron Wubshet",
            title: "Marketing Manager",
            quote: "Thanks to Adulis, we've been able to get the best bang for our buck on shipping. The platform is easy to use and helps us save money on every shipment"
        },
        {
            avatar: assefa,
            name: "Assefa Zerihun",
            title: "Truck Owner",
            quote: "Finding loads used to be a constant struggle. Adulis has connected me with a wider network of shippers, keeping my truck on the road and earning more."
        },
    ]

    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-main text-2xl font-bold pb-6">What people are saying</h3>
                    <ul>
                        {
                            testimonials.map((item, idx) => (
                                currentTestimonial == idx ? (
                                    <li key={idx}>
                                        <figure>
                                            <blockquote>
                                                <p className="text-gray-800 text-xl font-semibold sm:text-2xl">
                                                    “{item.quote}“
                                                </p>
                                            </blockquote>
                                            <div className="mt-6">
                                                <img src={item.avatar} className="w-16 h-16 mx-auto rounded-full" />
                                                <div className="mt-3">
                                                    <span className="block text-gray-800 font-semibold">{item.name}</span>
                                                    <span className="block text-gray-600 text-sm mt-0.5">{item.title}</span>
                                                </div>
                                            </div>
                                        </figure>
                                    </li>
                                ) : ""
                            ))
                        }
                    </ul>
                </div>
                <div className="mt-6">
                    <ul className="flex gap-x-3 justify-center">
                        {
                            testimonials.map((item, idx) => (
                                <li key={idx}>
                                    <button className={`w-2.5 h-2.5 rounded-full duration-150 ring-offset-2 ring-main-500 focus:ring ${currentTestimonial == idx ? "bg-main-500" : "bg-gray-300"}`}
                                        onClick={() => setCurrentTestimonial(idx)}
                                    ></button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Testimony;