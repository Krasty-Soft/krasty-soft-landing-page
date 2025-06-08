const PAGES = {
  industries: [
    {
      slug: 'maritime-transportation',
      label: 'Maritime Transportation',
      description: 'Ship tracking, fleet optimization, cargo management, and port logistics solutions.',
    },
    {
      slug: 'healthcare',
      label: 'Healthcare',
      description: 'Telemedicine platforms, patient management systems, EHR solutions, and medical data security.',
    },
    {
      slug: 'fintech',
      label: 'FinTech',
      description: 'Crypto solutions, payment gateways, investments app, SaaS etc. Bring your fintech idea into life!',
    },
    {
      slug: 'insurance',
      label: 'Insurance',
      description: 'Claims automation, risk assessment tools, policy management systems, and fraud detection solutions.',
    },
  ],
  services: [
    {
      slug: 'retool-development',
      label: 'Retool Development',
      description: 'Optimize your business processes with powerful, no-code Retool solutions tailored to your needs.',
    },
    {
      slug: 'custom-software-development',
      label: 'Custom Software Development',
      description: 'Design, develop, and deploy custom software solutions tailored to your specific business needs.',
    },
    {
      slug: 'backend-development',
      label: 'Backend Development',
      description: 'Build robust and scalable APIs to power your applications and streamline data exchange.',
    },
  ]
} as const;

export default PAGES;
