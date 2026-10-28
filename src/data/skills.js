// `icon` is optional — entries without one render as plain text.

// Simple Icons dropped Oracle, so its pill-shaped "O" mark is drawn inline.
const oracleIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='2' y='6.5' width='20' height='11' rx='5.5' fill='none' stroke='%23F80000' stroke-width='3'/%3E%3C/svg%3E";

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Go', icon: 'https://cdn.simpleicons.org/go/00ADD8' },
      { name: 'Rust', icon: 'https://cdn.simpleicons.org/rust/DEA584' },
      { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/ED8B00' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/springboot/6DB33F' },
      { name: 'Hibernate', icon: 'https://cdn.simpleicons.org/hibernate/BCAE79' },
      { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    ],
  },
  {
    category: 'Architecture & Patterns',
    skills: [
      { name: 'Microservices' },
      { name: 'Onion / Clean Architecture' },
      { name: 'Event-Driven' },
    ],
  },
  {
    category: 'Networking & P2P',
    skills: [
      { name: 'libp2p' },
      { name: 'WireGuard', icon: 'https://cdn.simpleicons.org/wireguard/88171A' },
      { name: 'gRPC' },
      { name: 'NAT Traversal' },
    ],
  },
  {
    category: 'Messaging',
    skills: [
      { name: 'Kafka', icon: 'https://cdn.simpleicons.org/apachekafka/FFFFFF' },
      { name: 'RabbitMQ', icon: 'https://cdn.simpleicons.org/rabbitmq/FF6600' },
    ],
  },
  {
    category: 'Infrastructure & DevOps',
    skills: [
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
      { name: 'Prometheus', icon: 'https://cdn.simpleicons.org/prometheus/E6522C' },
      { name: 'Grafana', icon: 'https://cdn.simpleicons.org/grafana/F46800' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'Oracle', icon: oracleIcon },
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
    ],
  },
  {
    category: 'Spoken Languages',
    skills: [
      { name: 'Turkish' },
      { name: 'English' },
      { name: 'Spanish' },
    ],
  },
];

export default skillGroups;
