import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="container px-4 md:px-8 lg:px-c-50 xl:px-c-200">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-black">
                        404
                    </h1>
                    <h2 className="text-1xl md:text-2xl font-bold mb-4 text-black">
                        Page Not Found
                    </h2>
                    <p className="text-md text-dark-grey mb-8">
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for. It might have been moved or doesn&apos;t
                        exist.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-red text-white rounded-[40px] border-1 border-transparent hover:bg-white hover:text-red hover:border-red transition-colors duration-200 font-medium"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
