import { Section } from "@/components/ui";
import Icon1 from "@/assets/test-idea.svg";
import Icon2 from "@/assets/create-custom-tool.svg";
import Icon3 from "@/assets/flexibility-in-deployment.svg";
import Icon4 from "@/assets/optimise-workflows.svg";
import Icon5 from "@/assets/integrate-crm.svg";
import Icon6 from "@/assets/maximize-cloud-resources.svg";
import Icon7 from "@/assets/elevate-marketing.svg";
import Icon8 from "@/assets/automate-reporting-analytics.svg";
import React from "react";
import Link from "next/link";


const icons = {
  Idea: Icon1,
  Tool: Icon2,
  Flexibility: Icon3,
  Optimise: Icon4,
  Crm: Icon5,
  Cloud: Icon6,
  Elevate: Icon7,
  Automatization: Icon8,
}

const useCases = [
  { id: '1', title: 'Test idea with MVP', link: '/', icon: 'Idea' },
  { id: '2', title: 'Create a custom internal tool', link: '/', icon: 'Tool' },
  { id: '3', title: 'Flexibility in deployment', link: '/', icon: 'Flexibility' },
  { id: '4', title: 'Optimise workflows', link: '/', icon: 'Optimise' },
  { id: '5', title: 'Integrate with CRM or ERP', link: '/', icon: 'Crm' },
  { id: '6', title: 'Maximize Cloud resources', link: '/', icon: 'Cloud' },
  { id: '7', title: 'Elevate marketing for success', link: '/', icon: 'Elevate' },
  { id: '8', title: 'Automate reporting and analytics', link: '/', icon: 'Automatization' },
] as const;

export const UseCases = () => {
  return (
    <Section variant={'secondary'} subtitle={'Retool No-Code'} title={'What do you need today?'}>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {useCases.map((item, i) => {
          const Icon = icons[item.icon]
          return (
            <li key={i}>
              <Link
                href={item.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--surface-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(220,38,38,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                {/* Red circle icon */}
                <div style={{
                  width: '3.25rem',
                  height: '3.25rem',
                  flexShrink: 0,
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon />
                </div>

                {/* Title */}
                <span style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.4',
                }}>
                  {item.title}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
