import { Breadcrumbs } from '@/components'
import { ContactForm, Industries, Placeholder } from '@/components/blocks'
import { Image } from '@/components/ui'
import { Case } from '@/lib/cases'

interface TemplateSrmProps {
    caseData: Case
}

function createSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

const tableOfContents = [
    'Overview of the Project and CRM System Development',
    'Business Context and the Development of CRM System',
    'Approach to Bespoke CRM Development',
    'Turnkey CRM System Development and Core Features',
    'Outcomes and Operational Impact of CRM System Development',
]

export function TemplateSrm({ caseData }: TemplateSrmProps) {
    return (
        <div>
            <div className="container bg-background px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
                <div className="pt-6 pb-8">
                    <Breadcrumbs />
                </div>
                <h1 className="text-1xl mb-8">
                    Case Study: CRM System Development for US Flooring Retailer
                    Project Brief
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="col-span-4 text-sm">
                        {/* Table of Contents */}
                        <strong className="text-xl mb-3 font-medium block">
                            Content
                        </strong>
                        <nav className="mb-c-50">
                            <ul className="space-y-2">
                                {tableOfContents.map((title) => {
                                    const slug = createSlug(title)
                                    return (
                                        <li key={slug}>
                                            <a
                                                href={`#${slug}`}
                                                className="text-dark-grey hover:text-black transition-colors underline"
                                            >
                                                {title}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                        <div className="mb-6">
                            <strong className="text-xl mb-3 font-medium block">
                                Niche
                            </strong>
                            <p className="text-dark-grey">
                                Home improvement retail — flooring
                            </p>
                        </div>
                    </div>
                    <div className="col-span-8">
                        <Image
                            src={
                                caseData.media.find((media) =>
                                    media.title?.includes('img1')
                                )?.url || ''
                            }
                            alt={
                                caseData.media.find((media) =>
                                    media.title?.includes('img1')
                                )?.description || ''
                            }
                            wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden mb-6"
                            fillMode="object-fill"
                        />
                        <section className="mb-c-50">
                            <div className="mb-6">
                                <strong className="text-xl mb-3 font-medium block">
                                    Problematic
                                </strong>
                                <p className="text-dark-grey mb-4">
                                    The client approached us with a clear need
                                    to bring structure and visibility to their
                                    growing operations. Their tools and
                                    communication channels were fragmented,
                                    resulting in inconsistent project tracking
                                    and team coordination.
                                </p>
                                <p className="text-dark-grey mb-4">
                                    Emails, SMS, and field updates were stored
                                    in separate systems, leading to missed
                                    follow-ups and inconsistent project status
                                    updates. Manual updates delayed approvals
                                    and task transitions. Leadership lacked an
                                    accurate, real-time picture of ongoing work.
                                    As the installation volume increased, these
                                    issues began to affect overall efficiency,
                                    which required dedicated custom software
                                    development services to resolve the problem.
                                </p>
                            </div>

                            <div className="mb-6">
                                <strong className="text-xl mb-3 font-medium block">
                                    Solution
                                </strong>
                                <p className="text-dark-grey mb-4">
                                    We chose to focus on bespoke CRM development
                                    and developed a strategy centered on
                                    consolidating communication, project
                                    oversight, and workflow automation through
                                    low-code development tools.
                                </p>
                                <p className="text-dark-grey mb-4">
                                    CRM software development enabled us to
                                    integrate Outlook and Twilio, bringing all
                                    messaging into one place and providing teams
                                    with a centralized communication history.
                                    Automated triggers replaced manual
                                    follow-ups. Shared calendars and real-time
                                    dashboards improved cross-team coordination
                                    and provided real-time operational
                                    visibility for the leadership.
                                </p>
                            </div>

                            <div className="mb-6">
                                <strong className="text-xl mb-3 font-medium block">
                                    Technologies
                                </strong>
                                <p className="text-dark-grey">
                                    PostgreSQL, AWS, Microsoft 365, Twilio,
                                    Retool
                                </p>
                            </div>
                        </section>
                        <section className="mb-c-50">
                            <h2
                                id={createSlug(
                                    'Overview of the Project and CRM System Development'
                                )}
                                className="text-2xl mb-4"
                            >
                                Overview of the Project and CRM System
                                Development
                            </h2>
                            <p className="text-dark-grey mb-4">
                                The project focused on CRM system development
                                for The Design Gallery by Paul Evans, a leading
                                flooring retailer in the Permian Basin. The
                                company is known for its unmatched in-stock
                                inventory, same-week installation services, and
                                the ability to manage a large volume of customer
                                projects simultaneously.
                            </p>
                            <p className="text-dark-grey">
                                The client&apos;s fast-paced operating model
                                required clear coordination between sales,
                                office staff, and installation teams. To support
                                these operations, our Retool development agency
                                created a unified CRM platform that centralizes
                                communication, organizes project lifecycles, and
                                automates routine actions.
                            </p>
                        </section>

                        <section className="mb-c-50">
                            <h2
                                id={createSlug(
                                    'Business Context and the Development of CRM System'
                                )}
                                className="text-2xl mb-4"
                            >
                                Business Context and the Development of CRM
                                System
                            </h2>
                            <p className="text-dark-grey mb-4">
                                Before the project began, the company relied on
                                Outlook, separate SMS tools, and manual
                                spreadsheets to manage daily tasks. Each
                                department worked from its own sources of truth,
                                resulting in inconsistent project data, unclear
                                responsibilities, and frequent delays. These
                                limitations necessitated the development of a
                                CRM system.
                            </p>
                            <p className="text-dark-grey">
                                To address the core operational gaps, the new
                                platform needed to become a single hub that
                                provided:
                            </p>
                            <ul className="list-disc list-inside text-dark-grey mt-4 space-y-2">
                                <li>
                                    full visibility into every project phase,
                                    from measurement to installation;
                                </li>
                                <li>
                                    centralized communication for email, SMS,
                                    and field updates;
                                </li>
                                <li>
                                    accurate logging of client interactions and
                                    team activity;
                                </li>
                                <li>
                                    a simple interface suitable for
                                    non-technical staff handling high-volume
                                    work.
                                </li>
                            </ul>
                        </section>

                        <section className="mb-c-50">
                            <h2
                                id={createSlug(
                                    'Approach to Bespoke CRM Development'
                                )}
                                className="text-2xl mb-4"
                            >
                                Approach to Bespoke CRM Development
                            </h2>
                            <p className="text-dark-grey mb-4">
                                Krasty Soft approached the project as a bespoke
                                CRM development initiative, starting with a
                                detailed audit of the retailer&apos;s processes.
                                We analyzed how tasks were distributed among
                                sales, office staff, and installation crews,
                                which enabled us to design modules that aligned
                                with operational workflows. Communication
                                touchpoints — emails, SMS notifications,
                                approvals, and scheduling — were mapped and
                                connected into a single system.
                            </p>
                            <p className="text-dark-grey mb-4">
                                To accelerate delivery and maintain flexibility,
                                we used Retool as the interface layer, making
                                the platform suitable for low-code development
                                while preserving custom logic. Acting as a
                                Retool development agency, Krasty Soft built
                                tailored dashboards, forms, and communication
                                components that could scale across teams. This
                                low-code foundation allowed the client to modify
                                or extend modules without rebuilding the system.
                            </p>
                        </section>

                        <section className="mb-c-50">
                            <h2
                                id={createSlug(
                                    'Turnkey CRM System Development and Core Features'
                                )}
                                className="text-2xl mb-4"
                            >
                                Turnkey CRM System Development and Core Features
                            </h2>
                            <p className="text-dark-grey mb-4">
                                The solution was delivered as a full turnkey CRM
                                system development project that consolidated all
                                operational steps, from lead intake to
                                installation, into a single platform. This
                                eliminated scattered tools, standardized
                                workflows, and ensured that every team worked
                                with real-time project information. Built as a
                                central operational hub, the system was
                                developed in phased iterations to support the
                                company&apos;s entire service lifecycle.
                            </p>
                            <p className="text-dark-grey mb-6">
                                A key element of the CRM software development
                                process was unifying communication and
                                automating routine actions to prevent
                                information loss and delays. Emails synchronized
                                with Outlook were automatically linked to the
                                right project, while Twilio enabled sending and
                                receiving SMS directly within the CRM. Calendar
                                sync ensured accurate appointment and
                                installation scheduling across web and mobile.
                            </p>

                            <div>
                                <h3 className="text-xl mb-4 font-medium">
                                    Core Features
                                </h3>
                                <p className="text-dark-grey mb-4">
                                    Built together with our capabilities as a
                                    Retool development agency, the CRM platform
                                    included the following core features:
                                </p>
                                <ul className="list-disc list-inside text-dark-grey space-y-2">
                                    <li>
                                        Centralized project, client, and account
                                        management;
                                    </li>
                                    <li>
                                        Unified inbox for Outlook emails and
                                        Twilio SMS;
                                    </li>
                                    <li>
                                        Automated workflow triggers for status
                                        changes and follow-ups;
                                    </li>
                                    <li>
                                        Real-time calendars with two-way Outlook
                                        synchronization;
                                    </li>
                                    <li>
                                        Full logging of team and client
                                        communication;
                                    </li>
                                    <li>
                                        Mobile access for installation crews and
                                        field teams.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-c-50">
                            <h2
                                id={createSlug(
                                    'Outcomes and Operational Impact of CRM System Development'
                                )}
                                className="text-2xl mb-4"
                            >
                                Outcomes and Operational Impact of CRM System
                                Development
                            </h2>
                            <p className="text-dark-grey mb-6">
                                The new CRM system development enabled us to
                                improve operational throughput and reduce delays
                                across the company&apos;s service pipeline.
                                Status transitions, approvals, and cross-team
                                coordination became faster and far more
                                predictable, giving leadership a stable and
                                scalable workflow foundation.
                            </p>

                            <div>
                                <h3 className="text-xl mb-4 font-medium">
                                    Key results:
                                </h3>
                                <ul className="list-disc list-inside text-dark-grey space-y-2">
                                    <li>
                                        Noticeable reduction in
                                        status-transition delays and follow-up
                                        gaps;
                                    </li>
                                    <li>
                                        Significant decrease in administrative
                                        workload for office staff;
                                    </li>
                                    <li>
                                        Faster approval cycles and fewer
                                        bottlenecks in daily task routing;
                                    </li>
                                    <li>
                                        A high percentage of routine actions
                                        became automated instead of being
                                        handled manually;
                                    </li>
                                    <li>
                                        Improved accuracy in scheduling and
                                        fewer missed updates;
                                    </li>
                                    <li>
                                        More reliable handoffs between sales,
                                        office, and installation teams.
                                    </li>
                                </ul>
                                <p className="text-dark-grey mt-6">
                                    Overall, the project demonstrated how
                                    turnkey CRM system development can simplify
                                    operational workflows by centralizing
                                    project data and lowering administrative
                                    load.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <ContactForm isDark />
            <Industries />
            <Placeholder size={'medium'}>Awards</Placeholder>
            {/*<Awards />*/}
        </div>
    )
}
