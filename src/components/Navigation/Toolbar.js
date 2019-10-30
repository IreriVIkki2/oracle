import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import css from "./Toolbar.module.css";
import main from "../../../main.css";

const Toolbar = ({ showSidebar }) => {
    const home = useRouter().route === "/";
    const [height, setHeight] = useState("#00000000");

    useEffect(() => {
        window.addEventListener("scroll", e => {
            // setHeight(Math.floor(window.scrollY * 0.14));
            let num = Math.floor(window.scrollY * 0.18);
            if (num < 10) {
                setHeight(`#0000000${num}`);
            } else if (num > 100) {
                setHeight("#000000");
            } else {
                setHeight(`#000000${num}`);
            }
        });
    }, [height]);

    const navbg = home
        ? { backgroundColor: height }
        : { backgroundColor: "#000000e0" };
    return (
        <div className={css.Toolbar} style={navbg}>
            <div className={css.Logo}>
                <h1 className={`${main.LaBelle} ${main.TextGold}`}>Natasha</h1>
            </div>
            <nav className={css.Nav}>
                <ul className={css.NavItems}>
                    <li>
                        <Link href="/about">
                            <p className="">ABOUT</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/events">
                            <p className="">EVENTS</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/books">
                            <p className="">BOOKS</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog">
                            <p className="">BLOG</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/support">
                            <p className="">SUPPORT</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={css.HamburgerMenu} onClick={showSidebar}>
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default Toolbar;
