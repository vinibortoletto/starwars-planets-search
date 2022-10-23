import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className="my-10 flex flex-col gap-4 items-center">
      <h2>
        <span>Desenvolvido por </span>
        <span className="font-bold text-amber-500">vini.bortoletto</span>
      </h2>

      <ul className="flex gap-4 text-2xl text-amber-500">
        <li>
          <a href="https://www.linkedin.com/in/vinicius-bortoletto/">
            <AiFillLinkedin />
          </a>
        </li>
        <li>
          <a href="https://github.com/vinibortoletto/">
            <AiFillGithub />
          </a>
        </li>
      </ul>
    </footer>
  );
}
