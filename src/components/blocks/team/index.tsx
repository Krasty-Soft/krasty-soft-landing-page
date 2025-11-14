import { TEAM_MEMBERS } from "@/lib/team";
import Image from "next/image";
import Link from "next/link";
import LinkedInIcon from "@/assets/team-linkedin.svg";
import EmailIcon from "@/assets/team-mail.svg";

const Team = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-light-grey hover:shadow-lg transition-shadow"
            >
              {member.picture && (
                <div className="w-full aspect-square relative rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.picture}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {member.position}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                {member.email && (
                  <Link
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-red transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <EmailIcon className="w-5 h-5 color-black" />
                  </Link>
                )}
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black transition-colors"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <LinkedInIcon className="w-5 h-5 color-black" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
