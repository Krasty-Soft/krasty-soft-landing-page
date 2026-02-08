import { Section } from "@/components/ui";
import { Friends } from "./friends";
import { Reviews } from "./reviews";

const mockReviews = [
  {
    id: '1',
    name: 'Amanda Doe',
    position: 'VP Marketing',
    company: 'Google',
    review: 'Everybody who’s seen the app tells me how much they like it. I’m very pleased with the app.',
    img: '',
  },
  {
    id: '2',
    name: 'Marc Brunet',
    position: 'CEO',
    company: 'Cubebrush',
    review: 'It’s been a very, very cool casual partnership that we’ve had. It’s almost like they’re my employees.',
    img: '',
  },
  {
    id: '3',
    name: 'Michael Roberts',
    position: 'CEO',
    company: 'BrightTech',
    review: 'The collaboration has been absolutely fantastic! It feels like they are part of my team, always ready to support and assist with anything.',
    img: '',
  },
]
const mockFriends = [
  { id: '1', logo: 'https://placehold.co/90x40.png', name: 'Google' },
  { id: '2', logo: 'https://placehold.co/90x40.png', name: 'Amazon' },
  { id: '3', logo: 'https://placehold.co/90x40.png', name: 'Netflix' },
  { id: '4', logo: 'https://placehold.co/90x40.png', name: 'Spotify' },
  { id: '5', logo: 'https://placehold.co/90x40.png', name: 'Tesla' },
  { id: '6', logo: 'https://placehold.co/90x40.png', name: 'Adobe' },
  { id: '7', logo: 'https://placehold.co/90x40.png', name: 'Airbnb' },
  { id: '8', logo: 'https://placehold.co/90x40.png', name: 'Stripe' },
  { id: '9', logo: 'https://placehold.co/90x40.png', name: 'Slack' },
  { id: '10', logo: 'https://placehold.co/90x40.png', name: 'Notion' },
  { id: '11', logo: 'https://placehold.co/90x40.png', name: 'Figma' },
  { id: '12', logo: 'https://placehold.co/90x40.png', name: 'Dropbox' },
];


export const ReviewsBlock = () => {
  return (
    <Section
      variant="secondary"
      subtitle={'Our friends'}
      title={'Join this group of outstanding brands we’re happy to call our clients'}
    >
      <div className="mb-10 md:mb-11 lg:mb-c-50 xl:mb-20">
        <Friends data={mockFriends} />
      </div>
      <Reviews data={mockReviews} />
    </Section>
  )
}
