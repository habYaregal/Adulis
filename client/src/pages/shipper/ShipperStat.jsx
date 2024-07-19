const ShipperStat = () => {

    const stats = [
        {
            data: "3",
            title: "Active Shipment"
        },
        {
            data: "1",
            title: "Pending Shipment"
        },
        {
            data: "12",
            title: "Completed Shipment"
        },
    ]

    return (
        <section className="py-28 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-main-700 text-3xl font-semibold sm:text-4xl">
                        We believe we fulfill all your desire
                    </h3>
                    <p className="mt-3 text-gray-800 text-xl">
                        We are always available to make sure you had a great time with us. Here is all your shipment status over the years.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="flex flex-col gap-4 items-center justify-center sm:flex-row">
                        {
                            stats.map((item, idx) => (
                                <li key={idx} className="w-full text-center bg-main-800 px-12 py-4 rounded-lg sm:w-auto">
                                    <h4 className="text-4xl text-white font-semibold">{item.data}</h4>
                                    <p className="mt-3 text-gray-200 font-medium">{item.title}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default ShipperStat;