import { Menu } from "@/components/header/menu";
import Logo from "@/assets/Logo.svg";

const paddings = 'px-4 md:px-8 lg:px-12 xl:px-24 py-4 lg:py-5 xl:py-4';

export const Header = () => {
  return (
    <header
      className={`flex items-center justify-between h-[74px] ${paddings} shadow-block`}
    >
      <Logo />
      <Menu />
    </header>
  )
}
