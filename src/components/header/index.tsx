import { Menu } from "@/components/header/menu";
import Logo from "@/assets/Logo.svg";

const paddings = 'px-4 py-4 md:px-8 lg:px-c-50 xl:px-c-200';

export const Header = () => {
  return (
    <header
      className=" h-[74px] lg:h-20 xl:h-[90px] rounded-b-[10px] shadow-block"
    >
      <div className={`container flex items-center justify-between ${paddings}`}>
        <Logo />
        <Menu />
      </div>
    </header>
  )
}
