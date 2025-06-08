import React from "react";
import { Accordion } from "@/components";
import { Section } from '@/components/ui'
import { ServiceType } from "@/types";

const mock: ServiceType[] = [
  {
    title: 'Retool Development',
    description: 'Optimize your business processes with powerful, no-code Retool solutions tailored to your needs.',
    link: '',
    content: ['Custom Retool Apps', 'Retool Dashboard Development', 'Database & API Integrations', 'Retool UI/UX Customization']
  },
  {
    title: 'Retool Consultancy',
    description: 'Get expert guidance to develop a Retool strategy that aligns with your business goals.',
    link: '',
    content: ['Retool Strategy Planning', 'App Architecture Review', 'Retool Best Practices Training', 'Migration to Retool'],
  },
  {
    title: 'Custom Software Development',
    description: 'Design, develop, and deploy custom software solutions tailored to your specific business needs.',
    link: '',
    content: ['End-to-End Software Solutions', 'MVP Development', 'Legacy System Modernization', 'Software Maintenance & Support'],
  },
  {
    title: 'Backend Development',
    description: 'Build robust and scalable APIs to power your applications and streamline data exchange.',
    link: '',
    content: ['API Development', 'Database Architecture Design', 'Serverless Backend Solutions', 'Authentication & Security'],
  },
  {
    title: 'Frontend Development',
    description: 'Create responsive, high-performance web applications with seamless user experiences.',
    link: '',
    content: ['Custom Web Application Development', 'UI/UX Design Implementation', 'Performance Optimization', 'Cross-Platform Development'],
  },
];

export const Services = () => {
  return (
    <Section
      variant={'paper'}
      subtitle={'Products and services'}
      title={'Digital products and five-star services.'}
    >
      <div>
        {
          mock.map((item, index) => {
            return (
              <Accordion
                key={index}
                data={item}
                index={index + 1}
                initState={index === 0}
              />
            )
          })
        }
      </div>
    </Section>
  )
}
