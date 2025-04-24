'use client'

import { Input } from "@/components";
import MailIcon from "@/assets/footer-mail.svg";
import PhoneIcon from "@/assets/footer-phone.svg";
import Insta from "@/assets/footer-instagram.svg";
import LinkedIn from "@/assets/footer-linkedin.svg";
import TikTok from "@/assets/footer-tiktok.svg";
import YouTube from "@/assets/footer-youtube.svg";
import Attach from "@/assets/footer-clip.svg";
import React, {useState} from "react";

export const Footer = () => {
  const [error, setError] = useState<string | null>(null);
  return (
    <footer
      id="footer"
      className="bg-black text-white font-medium"
    >
      <div className="px-4 py-12">
        <p
          className="text-xs mb-4"
        >
          Contact us
        </p>
        <h2
          className="text-[22px] mb-10"
        >
          Get in touch for expert support.
        </h2>

        <div className="mb-10">
          <p className="mb-8">For job seekers</p>
          <div className="flex flex-col gap-7">
            <a
              className="flex items-center gap-4"
              href="mailto:sales@krasty.me"
            >
              <div className="h-[34px] w-[34px] bg-red rounded-full center">
                <MailIcon />
              </div>
              sales@krasty.me
            </a>
            <a
              className="flex items-center gap-4"
              href="tel:+380992000187"
            >
              <div className="h-[34px] w-[34px] bg-red rounded-full center">
                <PhoneIcon />
              </div>
              +38 (099) 200 01 87
            </a>
          </div>
        </div>

        <div>
          <p className="mb-8">For job seekers</p>
          <form
            className="flex flex-col gap-8"
            action="#"
          >
            <Input placeholder={ 'Your name'} />
            <Input placeholder={ 'Your email'} />
            <Input placeholder={ 'Your phone'} />
            <div className="relative">
              <textarea
                className="px-5 py-4 w-full outline-0 resize-none bg-dark-green text-white placeholder-dark-grey rounded-2xl h-48"
                name="message"
                id="message"
                placeholder="Your message"
              />
              {
                error && <p className="absolute top-0 left-0 text-xs text-red">{error}</p>
              }
            </div>
            <label htmlFor="attach" className="flex items-center gap-4 cursor-pointer">
              <input className="hidden" type="file" name="attach" id="attach"/>
              <div className="h-8 w-8 bg-background rounded-md center">
                <Attach />
              </div>
              Attach your file
            </label>
          </form>
        </div>
      </div>

      <div className="border-t border-t-dark-green py-10">
        <ul className="flex justify-center gap-4 mb-8">
          <li className="h-8 w-8 bg-background rounded-md center">
            <a href="#">
              <Insta />
            </a>
          </li>
          <li className="h-8 w-8 bg-background rounded-md center">
            <a href="#">
              <LinkedIn />
            </a>
          </li>
          <li className="h-8 w-8 bg-background rounded-md center">
            <a href="#">
              <TikTok />
            </a>
          </li>
          <li className="h-8 w-8 bg-background rounded-md center">
            <a href="#">
              <YouTube />
            </a>
          </li>
        </ul>
        <p className="text-center">Copyright © 2025 Krasty Soft</p>
      </div>
    </footer>
  )
}
