export interface Post { slug: string; date: string; title: string; excerpt: string; body: string[]; contentKey?: 'legacy-integration'; featuredImage?: string; featuredImageAlt?: string; description?: string; }

export const posts: Post[] = [
    {
      slug:'legacy-system-integration',
      date:'17 September 2026',
      title:'Legacy System Integration: Connect ERP, CRM, and Partner Systems Without a Full Rewrite',
      excerpt:'Keep useful existing systems. Define the contracts, data ownership, failure handling, and rollout boundaries that connect them reliably.',
      description:'Connect legacy ERP, CRM, and partner systems with APIs, adapters, events, and batch flows. Plan data ownership, failure handling, and a phased rollout.',
      contentKey:'legacy-integration',
      featuredImage:'/images/articles/legacy-system-integration/cover-768.webp',
      featuredImageAlt:'Legacy documents connect through a contract boundary to shared interfaces in NMIT’s teal, amber, and sage palette.',
      body:[],
    },
    {
      slug:'telecom-cloud-migration',
      date:'12 December 2024',
      title:'Why telecom operators keep moving core functions to the cloud',
      excerpt:'Billing and CRM move first because they\u2019re easy to decouple. Core network functions take years longer, and usually run hybrid the whole way through.',
      body:[
        'Telecom operators have spent the last few years moving workloads that used to live in purpose-built data centers \u2014 billing, subscriber management, network functions \u2014 onto commercial cloud infrastructure. The pitch is straightforward: elastic capacity during demand spikes, fewer hardware refresh cycles, and infrastructure a smaller team can actually maintain.',
        'The scale of the shift shows up in market estimates. A widely cited 2022 industry forecast put the telecom cloud market on track to exceed $105.7 billion by 2030, growing at roughly 14.45% a year over that period. Numbers like that move around depending on who\u2019s counting and what they include, but the direction has held: operators keep adding cloud-native workloads rather than pulling them back.',
        'What doesn\u2019t show up in the market-size headline is how uneven the migration actually is inside a single operator. Billing and CRM systems move first because they\u2019re easier to decouple. Core network functions \u2014 the parts that touch actual call and data routing \u2014 move slower, and usually need a hybrid setup for years before anything fully leaves the on-premise environment.',
        'That\u2019s the part we spend most of our time on: not the initial lift-and-shift, but the integration layer that has to keep the cloud-native pieces and the legacy network functions talking to each other correctly while the migration is still in progress. Get that layer wrong and you don\u2019t find out until a billing run doesn\u2019t match what the network actually did.'
      ]
    },
    {
      slug:'partner-payment-apis',
      date:'5 January 2024',
      title:'What a partner-payment API actually has to do',
      excerpt:'Most integration problems aren\u2019t about the payment call itself. They\u2019re about what happens around it when a partner\u2019s endpoint doesn\u2019t behave.',
      body:[
        'A partner-payment API sounds like a narrow piece of infrastructure \u2014 one endpoint that moves money from your system to a partner\u2019s. In practice it\u2019s usually the most tested part of an integration, because it touches four things at once: your internal ledger, the partner\u2019s ledger, whatever compliance and fraud checks sit in between, and the retry logic for when any of those three don\u2019t respond in time.',
        'Most of the integration problems we see aren\u2019t about the payment call itself. They\u2019re about what happens around it \u2014 a partner\u2019s API changing a field name without much notice, a timeout that leaves a transaction in an ambiguous state, or an internal team that built the original integration leaving before anyone documented the edge cases.',
        'The fix isn\u2019t a smarter payment API. It\u2019s treating the integration as a system with its own monitoring, its own retry and reconciliation logic, and its own owner \u2014 not a script that ran fine in testing and then got left alone. Partner-payment integrations that hold up over years are the ones where someone can tell you, without checking logs first, what happens when the partner\u2019s endpoint is down for ten minutes.'
      ]
    },
    {
      slug:'hp-qualcomm-partnership',
      date:'20 January 2024',
      title:'When a hardware partnership changes what IT teams plan for',
      excerpt:'The interesting part of a chipmaker\u2013device partnership isn\u2019t the keynote demo. It\u2019s whether your existing software stack has actually been tested on it.',
      body:[
        'When two large hardware vendors extend a partnership, the headline usually reads like it\u2019s about consumer devices \u2014 new chips, new laptops, a keynote demo. For IT and procurement teams, the more useful question is what changes underneath: which reference platforms get long-term support, which driver and firmware update paths stay maintained, and which device classes are worth standardizing a fleet around for the next few years.',
        'HP and Qualcomm\u2019s continued work on ARM-based Windows devices is a case in point. The interesting part for a business buyer isn\u2019t the device itself \u2014 it\u2019s whether the software stack a company depends on (VPN clients, security agents, internal tools) has actually been tested against that architecture, not just marketed as compatible.',
        'We end up in these conversations from the infrastructure side: a client\u2019s device refresh cycle runs into a compatibility question with something we manage \u2014 a VPN gateway, an MDM policy, an internal API client \u2014 and the fix isn\u2019t in the hardware at all. It\u2019s in updating an integration that assumed a different processor architecture than what\u2019s now showing up in new fleet purchases.'
      ]
    }
  ];
