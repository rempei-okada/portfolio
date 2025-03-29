'use client'

import Image from "next-export-optimize-images/picture";
import Link from "next/link";
import styles from "./LinkButton.module.scss";
import clsx from "clsx";
import Arrow from "@/assets/images/Arrow.svg";

export const LinkButton = (
    {
        href,
        title,
        subTitle,
        className,
        target
    }: {
        href: string,
        title?: string
        subTitle?: string,
        className?: string,
        target?: string
    }
) => {

    return (
        <Link href={href} target={target}>
            <div className={clsx(styles.viewMore, className)}>
                {
                    title && <h2
                        className="font-jost font-light"
                        style={{
                            fontSize: "0.7rem",
                            userSelect: "none"
                        }}
                    >
                        {title}
                    </h2>
                }
                <h2
                    className="font-jost font-light"
                    style={{
                        userSelect: "none"
                    }}>
                    {subTitle}
                </h2>

                <Image alt="Arrow" className={styles.arrow} src={Arrow} />
            </div>
        </Link>
    );
};
