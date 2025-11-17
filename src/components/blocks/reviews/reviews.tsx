import { Image } from '@/components/ui'

interface Review {
    id: string
    name: string
    position: string
    company: string
    review: string
    img: string
}

export const Reviews = ({ data }: { data: Review[] }) => {
    return (
        <ul>
            {data.map((item) => {
                return (
                    <li
                        key={item.id}
                        className="py-6 border-b border-b-light-grey last:border-b-0 lg:grid lg:grid-cols-12"
                    >
                        <div className="mb-6 tracking-wider lg:col-span-8 lg:text-sm xl:text-lg">
                            {`"${item.review}"`}
                        </div>
                        <div className="flex items-center gap-5 lg:col-span-4 lg:col-start-10">
                            <div className="h-12 w-12 rounded-full bg-light-grey">
                                {item.img && (
                                    <Image src={item.img} alt={item.name} />
                                )}
                            </div>
                            <div className="text-sm flex-fixed">
                                <div className="xl:text-base">{item.name}</div>
                                <div className="text-dark-grey">{`${item.position}, ${item.company}`}</div>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
