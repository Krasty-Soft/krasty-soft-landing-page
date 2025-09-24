'use client'
import { useEffect, useState } from 'react'

export const Widget = () => {
    const [widget, setWidget] = useState<boolean>(false)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://widget.clutch.co/static/js/widget.js'
        script.async = true
        document.body.appendChild(script)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore-next-line
        setTimeout(() => window.CLUTCHCO.Init(), 500)
        setWidget(true)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div className="flex justify-center w-[185px] mt-4">
            {widget && (
                <div
                    className="clutch-widget w-full"
                    data-url="https://widget.clutch.co"
                    data-widget-type="2"
                    data-height="45"
                    data-nofollow="false"
                    data-expandifr="true"
                    data-scale="100"
                    data-clutchcompany-id="2343082"
                ></div>
            )}
        </div>
    )
}
